import { canvasDisplayModule } from "./canvasDisplayModule"
import { Vector } from "../primitives/vector2D"
import { multistateSprite } from "../gameObject/sprite";

export class gameMapDisplayModule extends canvasDisplayModule
{
    private mapCenter: Vector = new Vector(0, 0);
    private mapScale: number = 1;


    private tiles: multistateSprite[] = [];
    public generateNewMap(tileSizeX: number, tileSizeY: number)
    {
        this.tiles.forEach(e => {
            this.removeObject(e);
        });
        this.tiles.length = 0;

        for (let x = -tileSizeX / 2; x < tileSizeX /2; x+=1)
        {
            for (let y = -tileSizeX / 2; y < tileSizeX /2; y+=1)
            {
                if (Math.random() >= 0.5)
                {
                    let hole = new multistateSprite("./ressources/mapTiles/hole.jpg");
                    hole.position.x = x;
                    hole.position.y = y;
                    this.tiles.push(hole);
                    this.addObject(hole);
                }
            }
        }
    }

    public preDraw(): boolean
    {
        let ret = super.preDraw();
        if (ret)
        {
            this.currentContext.translate(-this.mapCenter.x + this.viewport.width / 2, -this.mapCenter.y + this.viewport.height / 2);
            this.currentContext.scale(1 / this.mapScale, 1 / this.mapScale);
        }
        return ret;
    }
}