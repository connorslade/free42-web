import { Parser } from "./parser";

export class Keymap {
  keys: Key[] = [];

  constructor(raw: string) {
    let lines = raw.split("\n");
    for (let line of lines) {
      if (line.startsWith("#")) continue;
      let [entry, _comment] = line.split("#");
      if (entry.length == 0) continue;

      let [rawKey, rawCodes] = entry.split(":");

      let key = rawKey
        .split(" ")
        .filter((x) => x.length > 0)
        .map((x) => x.trim());
      let shift =
        key.includes("Shift") ||
        (key.length == 1 && key[0].length == 1 && isUpperCase(key[0]));

      let codes = [];
      let parser = new Parser(rawCodes);
      while (true) {
        parser.skipWhitespace();
        let code = parser.nextInt();
        if (isNaN(code)) break;
        codes.push(code);
      }

      this.keys.push(new Key(key[key.length - 1], shift, codes));
    }
  }
}

export class Key {
  shift: boolean;
  key: string;
  codes: number[];

  constructor(key: string, shift: boolean, codes: number[]) {
    this.key = key;
    this.shift = shift;
    this.codes = codes;
  }
}

function isUpperCase(char: string) {
  return /[A-Z]/.test(char);
}
