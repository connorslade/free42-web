import { Point, Color, Bounds } from "./math.ts";
import { Parser } from "./parser.ts";

export class Layout {
  skin: Bounds | null = null;
  display: Display | null = null;
  keys: Key[] = [];
  annunciators: Annunciator[] = [];

  constructor(raw: string) {
    let lines = raw.split("\n");
    for (let line of lines) {
      if (line.startsWith("#")) continue;

      let [type, data] = line.split(": ");
      if (type == "Skin") this.parseSkin(data);
      else if (type == "Display") this.parseDisplay(data);
      else if (type == "Key") this.parseKey(data);
      else if (type == "Annunciator") this.parseAnnunciator(data);
    }
  }

  parseSkin(data: string) {
    let parser = new Parser(data);
    parser.skipWhitespace();
    this.skin = parser.nextRect();
  }

  parseDisplay(data: string) {
    let parser = new Parser(data);
    let [x, y] = parser.nextInts(2);
    let start = new Point(x, y);

    let [horizontal, vertical] = parser.nextInts(2);
    let scale = new Point(horizontal, vertical);

    parser.skipWhitespace();
    let foreground = Color.fromHex(parser.nextString());
    parser.skipWhitespace();
    let background = Color.fromHex(parser.nextString());

    if (foreground == null || background == null) throw "Invalid color format";
    this.display = new Display(start, scale, background, foreground);
  }

  parseKey(data: string) {
    let parser = new Parser(data);

    let keycode = parser.nextInt();
    parser.skipWhitespace();
    let sensitive = parser.nextRect();
    parser.skipWhitespace();
    let display = parser.nextRect();
    parser.skipWhitespace();
    let activeState = parser.nextPoint();

    this.keys.push(new Key(keycode, sensitive, display, activeState));
  }

  parseAnnunciator(data: string) {
    let parser = new Parser(data);

    let code = parser.nextInt();
    parser.skipWhitespace();
    let display = parser.nextRect();
    parser.skipWhitespace();
    let active = parser.nextPoint();

    this.annunciators.push(new Annunciator(code, display, active));
  }
}

export class Display {
  start: Point;
  scale: Point;
  background: Color;
  foreground: Color;

  constructor(
    start: Point,
    scale: Point,
    background: Color,
    foreground: Color,
  ) {
    this.start = start;
    this.scale = scale;
    this.background = background;
    this.foreground = foreground;
  }
}

export class Key {
  keycode: number;
  sensitive: Bounds;
  display: Bounds;
  activeState: Point;

  constructor(
    keycode: number,
    sensitive: Bounds,
    display: Bounds,
    activeState: Point,
  ) {
    this.keycode = keycode;
    this.sensitive = sensitive;
    this.display = display;
    this.activeState = activeState;
  }
}

export class Annunciator {
  code: number;
  bounds: Bounds;
  active: Point;

  constructor(code: number, bounds: Bounds, active: Point) {
    this.code = code;
    this.bounds = bounds;
    this.active = active;
  }
}
