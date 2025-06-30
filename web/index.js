import { Shell } from "./shell.js";
import { Layout } from "./layout.js";

(async () => {
  let skin = new Image();
  skin.src = "skin.gif";
  await new Promise((resolve) => {
    skin.onload = resolve;
  });

  let layout = await (await fetch("skin.layout")).text();

  let shell = new Shell(skin, new Layout(layout));
  console.log(shell);

  let module = await Free42();
  module.init(shell);

  module.keydown(29);
  module.keyup();
})();
