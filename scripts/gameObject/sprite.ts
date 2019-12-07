import { gameObjectVisual } from "../interfaces/gameObjectVisual";
import { canvasDisplayModule } from "../baseModule/canvasDisplayModule";
import { Vector } from "../primitives/vector2D"
import { gameMapDisplayModule } from "../baseModule/gameMapDisplayModule";

export class multistateSprite implements gameObjectVisual
{
    private texture: HTMLImageElement;

    public position: Vector = new Vector(0, 0);
    public r: number = 0;

    constructor(textureSource: string|HTMLImageElement)
    {
        if (typeof textureSource === "string")
        {
            this.texture = new Image();
            this.texture.src = textureSource;
        }
        else //HTMLImageElement
        {
            this.texture = textureSource;
        }
    }

    public draw(displayProvider: canvasDisplayModule): boolean {
        if (!(displayProvider instanceof canvasDisplayModule))
        {
            throw "Error: '" + typeof(displayProvider) + "' incompatible with gameObject.sprite. This class is meant for canvasDisplayModule only";
        }

        {
            let ctx = displayProvider.getContext();
            ctx.translate(this.position.x * displayProvider.mapTileSize.x, this.position.y * displayProvider.mapTileSize.y);
            ctx.rotate(this.r);

            ctx.drawImage(this.texture, -displayProvider.mapTileSize.x / 2, -displayProvider.mapTileSize.y / 2, displayProvider.mapTileSize.x, displayProvider.mapTileSize.y);

            ctx.rotate(-this.r);
            ctx.translate(-this.position.x * displayProvider.mapTileSize.x, -this.position.y * displayProvider.mapTileSize.y);
        }

        return true;
    }
    
}