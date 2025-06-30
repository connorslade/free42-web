import { Shell } from "./shell.ts";
import { Layout } from "./layout.ts";
import { Keymap } from "./keymap.ts";

import type { MainModule } from "./free42.d.ts";
declare function Free42(): Promise<MainModule>;

window.addEventListener("load", async () => {
  let skin = await loadImage("skin.gif");
  let layout = new Layout(await (await fetch("skin.layout")).text());
  let keymap = new Keymap(await (await fetch("keymap.txt")).text());
  let module = await Free42();

  (window as any).shell = new Shell(module, skin, layout, keymap);
});

async function loadImage(path: string): Promise<HTMLImageElement> {
  let skin = new Image();
  skin.src = path;
  return new Promise((resolve) => {
    skin.onload = () => resolve(skin);
  });
}
