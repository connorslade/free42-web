export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }
}

export class Color {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromHex(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result == undefined) return null;

    return new Color(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    );
  }
}

export class Bounds {
  min: Point;
  max: Point;

  constructor(a: Point, b: Point) {
    this.min = new Point(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.max = new Point(Math.max(a.x, b.x), Math.max(a.y, b.y));
  }

  static zeros(): Bounds {
    return new Bounds(new Point(0, 0), new Point(0, 0));
  }

  contains(point: Point) {
    return (
      point.x >= this.min.x &&
      point.x <= this.max.x &&
      point.y >= this.min.y &&
      point.y <= this.max.y
    );
  }

  size() {
    return [this.width(), this.height()];
  }

  width() {
    return this.max.x - this.min.x;
  }

  height() {
    return this.max.y - this.min.y;
  }
}
