import { States } from "./states.ts";
import { Point } from "./math.ts";
import type { MainModule } from "./free42";
import type { Layout } from "./layout.ts";
import type { Keymap } from "./keymap.ts";

// todo: move some stuff outta here
export class Shell {
  free42: MainModule;
  skin: HTMLImageElement;
  layout: Layout;
  keymap: Keymap;

  audio: AudioContext;
  screen: any;
  ctx: any;

  keydown: boolean = false;
  keyTimeouts: number[] = [];
  coreTimeout: number | null = null;
  settings: Settings = new Settings();
  states: States;

  constructor(
    free42: MainModule,
    skin: HTMLImageElement,
    layout: Layout,
    keymap: Keymap,
  ) {
    this.free42 = free42;
    this.skin = skin;
    this.layout = layout;
    this.keymap = keymap;

    this.audio = new AudioContext();
    this.screen = document.querySelector("#screen");
    this.ctx = this.screen.getContext("2d");

    this.settings.allowBigStack = true;
    this.free42.updateSettings(this.settings);

    this.screen.addEventListener("mousedown", (event: MouseEvent) => {
      this.audio.resume();
      let click = new Point(event.offsetX, event.offsetY);
      for (let key of this.layout.keys) {
        if (key.sensitive.contains(click)) this.keyPressed(key.keycode);
      }
    });

    this.screen.addEventListener("mousemove", (event: MouseEvent) => {
      let hover = new Point(event.offsetX, event.offsetY);
      let overButton = this.layout.keys.some((key) =>
        key.display.contains(hover),
      );

      if (overButton) this.screen.style.cursor = "pointer";
      else this.screen.style.cursor = "default";
    });

    document.addEventListener("mouseup", () => {
      if (this.keydown) this.keyReleased();
    });

    document.addEventListener("keydown", async (event) => {
      if (event.repeat) return;
      if (event.ctrlKey && ["c", "C"].includes(event.key))
        await navigator.clipboard.writeText(this.free42.copy());
      if (event.ctrlKey && ["v", "V"].includes(event.key))
        this.free42.paste(await navigator.clipboard.readText());

      console.log(event);
      for (let key of this.keymap.keys) {
        if (event.key == key.key && event.shiftKey == key.shift)
          for (let code of key.codes) {
            this.keyPressed(code);
            break;
          }
      }
    });

    document.addEventListener("keyup", () => {
      // todo: only if was pressed with keyboard
      this.keyReleased();
    });

    this.free42.FS.mkdir("/states");
    this.free42.FS.mount(this.free42.IDBFS, {}, "/states");
    this.free42.FS.syncfs(true, () => {});

    this.states = new States(this.free42);
    this.states.updateInterface();

    this.free42.init(this);
  }

  keyPressed(keycode: number) {
    if (this.keydown) this.keyReleased();
    if (this.coreTimeout != null) {
      clearTimeout(this.coreTimeout);
      this.free42.notify3(true);
    }

    this.keydown = true;
    let repeat = this.free42.keydown(keycode);
    this.free42.repaint();

    this.keyTimeouts = [
      setTimeout(() => this.free42.notify1(), 250),
      setTimeout(() => this.free42.notify2(), 2000),
    ];
  }

  keyReleased() {
    this.keydown = false;
    for (let timeout of this.keyTimeouts) clearTimeout(timeout);
    this.free42.keyup();
  }

  // == free42 core events==

  init() {
    console.log("Wasm module loaded!");

    if (this.layout.skin == null) throw "Invalid skin definition in layout";
    let [width, height] = this.layout.skin.size();

    // blit background
    this.ctx.drawImage(
      this.skin,
      this.layout.skin.min.x,
      this.layout.skin.min.y,
      width,
      height,
      0,
      0,
      width,
      height,
    );
  }

  blit(data: Uint8Array) {
    // 17 bytes per line, 131×16 px
    let display = this.layout.display;
    if (display == null) throw "Invalid display definition in layout";

    let image = this.ctx.createImageData(
      131 * display.scale.x,
      16 * display.scale.y,
    );
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 131; x++) {
        let data_idx = 17 * y + Math.floor(x / 8);
        let pixel = (data[data_idx] & (1 << x % 8)) == 0;
        let color = pixel ? display.foreground : display.background;

        for (let i = 0; i < display.scale.x; i++) {
          for (let j = 0; j < display.scale.y; j++) {
            let image_idx =
              ((y * display.scale.y + j) * (131 * display.scale.x) +
                x * display.scale.x +
                i) *
              4;
            image.data[image_idx + 0] = color.r;
            image.data[image_idx + 1] = color.g;
            image.data[image_idx + 2] = color.b;
            image.data[image_idx + 3] = 255;
          }
        }
      }
    }

    this.ctx.putImageData(image, display.start.x, display.start.y);
  }

  annunciators(
    updn: number,
    shf: number,
    prt: number,
    run: number,
    g: number,
    rad: number,
  ) {
    let annunciators: { [key: number]: number } = {
      1: updn,
      2: shf,
      3: prt,
      4: run,
      5: -1,
      6: g,
      7: rad,
    };

    for (let annunciator of this.layout.annunciators) {
      let status = annunciators[annunciator.code];
      if (status == -1) continue;

      let [width, height] = annunciator.bounds.size();
      let from = status == 1 ? annunciator.active : annunciator.bounds.min;

      this.ctx.drawImage(
        this.skin,
        from.x,
        from.y,
        width,
        height,
        annunciator.bounds.min.x,
        annunciator.bounds.min.y,
        width,
        height,
      );
    }
  }

  requestTimeout(timeout: number) {
    this.coreTimeout = setTimeout(() => {
      this.coreTimeout = null;
      this.free42.notify3(false);
    }, timeout);
  }

  beep(tone: number) {
    const TONES = [165, 220, 247, 277, 294, 330, 370, 415, 440, 554, 1865];
    let [freq, duration] = [TONES[tone], tone == 10 ? 125 : 250];

    let gain = this.audio.createGain();
    gain.connect(this.audio.destination);
    gain.gain.setValueAtTime(0.25, this.audio.currentTime);

    let oscillator = this.audio.createOscillator();
    oscillator.connect(gain);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, this.audio.currentTime);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }

  powerdown() {}
}

class Settings {
  matrixSingularmatrix = false;
  matrixOutOfRange = false;
  autoRepeat = false;
  allowBigStack = false;
  localizedCopyPaste = false;
}
