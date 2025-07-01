import { writable, type Writable } from "svelte/store";
import { shell, states } from "../main";
import type { MainModule } from "./free42";

export class States {
  constructor(free42: MainModule) {
    free42.FS.mkdir("/states");
    free42.FS.mount(free42.IDBFS, { autoPersist: true }, "/states");
    free42.FS.syncfs(true, () => {
      this.refresh();
      this.loadActive();
    });
  }

  saveActive() {
    shell?.free42.saveState("active");
  }

  loadActive() {
    this.load("active");
  }

  save(name: string) {
    shell?.free42.saveState(name);
    this.refresh();
  }

  load(name: string) {
    shell?.free42.loadState(name);
  }

  delete(name: string) {
    shell?.free42.FS.unlink(`/states/${name}`);
    this.refresh();
  }

  refresh() {
    shell?.free42.FS.syncfs(false, () => {});
    let state = shell?.free42.FS.readdir("/states") as string[] | undefined;
    if (state == undefined) return;

    state.reverse();
    states.set(state.filter((x) => x != "." && x != ".." && x != "active"));
  }
}
