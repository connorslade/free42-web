import { Shell } from "./shell.js";
import { Layout } from "./layout.js";

(async () => {
  let skin = new Image();
  skin.src = "skin.gif";
  await new Promise((resolve) => {
    skin.onload = resolve;
  });

  let layout = await (await fetch("skin.layout")).text();
  let module = await Free42();

  new Shell(module, skin, new Layout(layout));
})();
