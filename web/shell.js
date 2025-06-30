import { Layout } from "./layout.js";

const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");

export class Shell {
  constructor(skin, layout) {
    this.skin = skin;
    this.layout = layout;
  }

  init() {
    console.log("Wasm module loaded!");

    let [width, height] = [this.layout.skin.width(), this.layout.skin.height()];

    // blit background
    ctx.drawImage(
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

    let image = ctx.createImageData(
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

    ctx.putImageData(image, display.start.x, display.start.y);
  }

  annunciators(updn, shf, prt, run, g, rad) {}

  requestTimeout(timeout) {
    // todo: run notify3(true) if any keys are pressed (also cancel the timeout)
    setTimeout(() => {
      module.notify3(false);
    }, timeout);
  }

  beep(tone) {
    alert(`beep ${tone}`);
  }
}
