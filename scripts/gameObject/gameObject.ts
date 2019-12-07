import { multistateSprite } from "./sprite";
import { Vector } from "../primitives/vector2D"

export class gameObject 
{ 

    public sprite: multistateSprite;
    private position: Vector = new Vector(0, 0);
    private r: number = 0;

    constructor(textureSource: string)
    {
        this.sprite = new multistateSprite(textureSource);
        this.position = this.sprite.position;
    }

    public setPosition(x: number, y: number)
    {
        this.r = Math.atan2(y - this.position.y, x - this.position.x);
        this.position.x = x;
        this.position.y = y;
        this.sprite.r = this.r;
    }

    public getPosition(): Vector
    {
        return new Vector(this.position.x, this.position.y);
    }
}