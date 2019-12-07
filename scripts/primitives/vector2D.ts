export class Vector
{
    add(other: Vector): Vector { return new Vector(this.x + other.x, this.y + other.y); }
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) { this.x = x; this.y = y; }
    public equals(other: Vector) { return this.x == other.x && this.y == other.y; }
}