import { gameObjectVisual } from "../interfaces/gameObjectVisual";
import { canvasDisplayModule } from "../baseModule/canvasDisplayModule";
import { Vector } from "../primitives/vector2D"
import { gameMapDisplayModule } from "../baseModule/gameMapDisplayModule";
import { tileset } from "../interfaces/tilesetFormat";

export class multistateSprite extends gameObjectVisual
{
    private texture: HTMLImageElement;
    private textureOffset: Vector = new Vector(0, 0);
    private textureTileSize: Vector = new Vector(0, 0);

    public position: Vector = new Vector(0, 0);
    public r: number = 0;

    constructor(textureSource: string|HTMLImageElement, tileset: tileset = null, tileIndex: number = 0, zIndex: number = 0)
    {
        super();
        this.setZOrder(zIndex);

        if (typeof textureSource === "string")
        {
            this.texture = new Image();
            this.texture.src = textureSource;
        }
        else //HTMLImageElement
        {
            this.texture = textureSource;
        }

        if (tileset !== null)
        {
            //if (tileset.firstgid != 1)
            {
                tileIndex -= tileset.firstgid;
            }

            this.textureOffset.x = (tileIndex % tileset.columns) * tileset.tilewidth;
            this.textureOffset.y = (Math.floor(tileIndex / tileset.columns)) * tileset.tileheight;

            this.textureTileSize.x = tileset.tilewidth;
            this.textureTileSize.y = tileset.tileheight;
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

            if (this.textureOffset.x != 0 || this.textureOffset.y != 0)
            {
                ctx.drawImage(this.texture, 
                    this.textureOffset.x, this.textureOffset.y, 
                    this.textureTileSize.x, this.textureTileSize.y, 
                    -displayProvider.mapTileSize.x / 2, -displayProvider.mapTileSize.y / 2, 
                    displayProvider.mapTileSize.x, displayProvider.mapTileSize.y);
            }
            else //draw all
            {
                ctx.drawImage(this.texture, -displayProvider.mapTileSize.x / 2, -displayProvider.mapTileSize.y / 2, displayProvider.mapTileSize.x, displayProvider.mapTileSize.y);
            }

            ctx.rotate(-this.r);
            ctx.translate(-this.position.x * displayProvider.mapTileSize.x, -this.position.y * displayProvider.mapTileSize.y);
        }

        return true;
    }
    
}