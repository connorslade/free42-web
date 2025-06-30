import type { MainModule } from "./free42";

export class States {
  free42: MainModule;
  root: any;

  constructor(free42: MainModule) {
    this.free42 = free42;
    this.root = document.querySelector("#states");
  }

  updateInterface() {
    let states = this.free42.FS.readdir("/states");

    let list = document.createElement("ul");
    for (let state of states) {
      if (state == "." || state == "..") continue;
      let name = state.substring(0, state.length - 4);

      let li = document.createElement("li");
      li.innerText = name;
      list.append(li);
    }

    this.root.appendChild(list);
  }
}
