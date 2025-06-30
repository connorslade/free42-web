export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
}

export class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromHex(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return new Color(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    );
  }
}

export class Bounds {
  constructor(a, b) {
    this.min = new Point(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.max = new Point(Math.max(a.x, b.x), Math.max(a.y, b.y));
  }

  width() {
    return this.max.x - this.min.x;
  }

  height() {
    return this.max.y - this.min.y;
  }
}
