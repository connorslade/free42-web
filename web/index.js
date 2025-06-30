import { Shell } from "./shell.js";
import { Layout } from "./layout.js";
import { Keymap } from "./keymap.js";

(async () => {
  let skin = new Image();
  skin.src = "assets/skin.gif";
  await new Promise((resolve) => {
    skin.onload = resolve;
  });

  let layout = new Layout(await (await fetch("assets/skin.layout")).text());
  let keymap = new Keymap(await (await fetch("assets/keymap.txt")).text());
  let module = await Free42();

  window.shell = new Shell(module, skin, layout, keymap);
})();
