const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");

const CALLBACKS = {
  init: () => {
    console.log("Wasm module loaded!");
  },
  blit: (data) => {
    // 17 bytes per line, 131×16 px

    let image = ctx.createImageData(131, 16);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 131; x++) {
        let data_idx = 17 * y + Math.floor(x / 8);
        let pixel = (data[data_idx] & (1 << x % 8)) == 0;
        let color = pixel ? [107, 131, 107] : [11, 35, 39];

        let image_idx = (y * 131 + x) * 4;
        image.data[image_idx + 0] = color[0];
        image.data[image_idx + 1] = color[1];
        image.data[image_idx + 2] = color[2];
        image.data[image_idx + 3] = 255;
      }
    }

    ctx.putImageData(image, 0, 0);
  },
  annunciators: (updn, shf, prt, run, g, rad) => {},
  requestTimeout: (timeout) => {
    // todo: run notify3(true) if any keys are pressed (also cancel the timeout)
    setTimeout(() => {
      module.notify3(false);
    }, timeout);
  },
  beep: (tone) => {
    alert(`beep ${tone}`);
  },
};

(async () => {
  let module = await Free42();
  module.init(CALLBACKS);

  module.keydown(29);
  module.keyup();
})();
