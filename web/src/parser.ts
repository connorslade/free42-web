import { Point, Bounds } from "./math.js";

export class Parser {
  text: string;
  index: number;

  constructor(text: string) {
    this.text = text;
    this.index = 0;
  }

  inBounds(index?: number) {
    return index ?? this.index < this.text.length;
  }

  peek(): string | null {
    return this.inBounds() ? this.text[this.index] : null;
  }

  take() {
    if (this.index >= this.text.length) return null;
    return this.text[this.index++];
  }

  expect(str: string) {
    for (let i = 0; i < str.length; i++)
      if (this.take() != str[i]) throw new Error(`Expected ${str}`);
  }

  skipWhitespace() {
    while (this.inBounds() && isWhitespace(this.text[this.index])) this.index++;
  }

  nextInt() {
    let end = this.index;
    while (this.inBounds() && isDigit(this.text[end])) end++;
    let value = parseInt(this.text.substring(this.index, end));
    this.index = end;
    return value;
  }

  nextInts(count: number) {
    let values = [];
    for (let i = 0; i < count; i++) {
      values.push(this.nextInt());
      let peek = this.peek();
      if ((i + 1 != count && peek == ",") || isWhitespace(peek)) this.take();
    }
    return values;
  }

  nextPoint() {
    let [x, y] = this.nextInts(2);
    return new Point(x, y);
  }

  nextRect() {
    let [x, y, width, height] = this.nextInts(4);

    let start = new Point(x, y);
    let end = start.add(new Point(width, height));
    return new Bounds(start, end);
  }

  nextString() {
    let out = "";
    while (!isWhitespace(this.peek())) out += this.take();
    return out;
  }
}

function isDigit(char: string) {
  return /\d/.test(char);
}

function isWhitespace(char: string | null) {
  if (char == null) return false;
  return /\s/.test(char);
}
