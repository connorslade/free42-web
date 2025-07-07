import { writable, type Writable } from "svelte/store";
import { mount } from "svelte";
import "./app.css";

import App from "./App.svelte";
import { Layout } from "./lib/layout";
import { Keymap } from "./lib/keymap";
import { Shell } from "./lib/shell";
import { loadImage } from "./lib/misc";

// kinda jank but it's whatever
export let states: Writable<string[]> = writable([]);
export let status: Writable<string | null> = writable("Loading...");
export let version: Writable<string | null> = writable(null);

// ↓ this needs to be var due to the looser scoping :sob:
export var shell: Shell | null = null;
const app = mount(App, {
  target: document.getElementById("app")!,
});
export default app;

try {
  let skin = await loadImage("skin.gif");
  let layout = new Layout(await (await fetch("skin.layout")).text());
  let keymap = new Keymap(await (await fetch("keymap.txt")).text());
  let module = await Free42();

  version.set(module.free42Version());
  status.set(null);

  shell = new Shell(module, skin, layout, keymap);
  (window as any).shell = shell;
} catch (error) {
  status.set(`Failed to load: ${error}`);
}
