import { Point } from "./math.js";

export class Shell {
  constructor(free42, skin, layout) {
    this.free42 = free42;
    this.skin = skin;
    this.layout = layout;

    this.screen = document.querySelector("#screen");
    this.ctx = this.screen.getContext("2d");

    this.keydown = false;
    this.keyTimeouts = [];
    this.coreTimeout = null;

    this.screen.addEventListener("mousedown", (event) => {
      let click = new Point(event.offsetX, event.offsetY);
      for (let key of this.layout.keys) {
        if (key.sensitive.contains(click)) this.keyPressed(key.keycode);
      }
    });

    this.screen.addEventListener("mousemove", (event) => {
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

    this.free42.init(this);
  }

  keyPressed(keycode) {
    console.log(`keydown ${keycode}`);

    if (this.keydown) this.keyReleased();
    if (this.coreTimeout != null) {
      clearTimeout(this.coreTimeout);
      this.free42.notify3(true);
    }

    this.keydown = true;
    let repeat = this.free42.keydown(keycode);
    this.free42.repaint();
    console.log(`repeat: ${repeat}`);

    this.keyTimeouts = [
      setTimeout(() => {
        console.log("notify1");
        this.free42.notify1();
      }, 250),
      setTimeout(() => {
        console.log("notify2");
        this.free42.notify2();
      }, 2000),
    ];
  }

  keyReleased() {
    this.keydown = false;
    for (let timeout of this.keyTimeouts) clearTimeout(timeout);
    console.log("keyup");
    this.free42.keyup();
  }

  // == free42 core events==

  init() {
    console.log("Wasm module loaded!");

    let [width, height] = [this.layout.skin.width(), this.layout.skin.height()];

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

  blit(data) {
    // 17 bytes per line, 131×16 px
    let display = this.layout.display;

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

  annunciators(updn, shf, prt, run, g, rad) {}

  requestTimeout(timeout) {
    console.log(`set timeout for ${timeout}ms`);
    this.coreTimeout = setTimeout(() => {
      this.coreTimeout = null;
      module.notify3(false);
    }, timeout);
  }

  beep(tone) {
    alert(`beep ${tone}`);
  }
}
