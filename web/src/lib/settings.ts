import { writable, type Writable } from "svelte/store";
import { shell } from "../main";

export class Settings {
  matrixSingularmatrix = false;
  matrixOutOfRange = false;
  autoRepeat = false;
  allowBigStack = false;
  localizedCopyPaste = false;

  constructor() {
    let raw = window.localStorage.getItem("settings");
    if (raw != null) {
      let settings = JSON.parse(raw);
      this.matrixSingularmatrix = settings.matrixSingularmatrix;
      this.matrixOutOfRange = settings.matrixOutOfRange;
      this.autoRepeat = settings.autoRepeat;
      this.allowBigStack = settings.allowBigStack;
      this.localizedCopyPaste = settings.localizedCopyPaste;
    }
  }

  set() {
    shell?.free42.updateSettings(this);
    window.localStorage.setItem("settings", JSON.stringify(this));
  }

  setMatrixSingularmatrix(value: boolean) {
    this.matrixSingularmatrix = value;
    return this;
  }

  setMatrixOutOfRange(value: boolean) {
    this.matrixOutOfRange = value;
    return this;
  }

  setAutoRepeat(value: boolean) {
    this.autoRepeat = value;
    return this;
  }

  setAllowBigStack(value: boolean) {
    this.allowBigStack = value;
    return this;
  }

  setLocalizedCopyPaste(value: boolean) {
    this.localizedCopyPaste = value;
    return this;
  }
}

export let settings: Writable<Settings> = writable(new Settings());
settings.subscribe((settings) => settings.set());
