import { canvasDisplayModule } from "./canvasDisplayModule"
import { Vector } from "../primitives/vector2D"
import { multistateSprite } from "../gameObject/sprite";
import { tileset, tilemap } from "../interfaces/tilesetFormat";

export class gameMapDisplayModule extends canvasDisplayModule
{
    public mapCenter: Vector = new Vector(0, 0);
    public mapScale: number = 1;

    private mapTiles: {[index: string]: multistateSprite} = {};

    public importMapFromFile(map: tilemap, cleanup: boolean = false)
    {
        if (cleanup)
        {
            Object.keys(this.mapTiles).forEach(e => {
                this.removeObject(e);
                delete this.mapTiles[e];
            });
        }

        for (let layerIdx = 0; layerIdx < map.layers.length; ++layerIdx)
        {
            let currentLayer = map.layers[layerIdx];
            if (currentLayer.name == "col") //col layer
            {
                continue;
            }
            for (let chunkIdx = 0; chunkIdx < currentLayer.chunks.length; ++chunkIdx)
            {
                let currentChunk = currentLayer.chunks[chunkIdx];

                for (let tileIdx = 0; tileIdx < currentChunk.data.length; ++tileIdx)
                {
                    let currentTile = currentChunk.data[tileIdx];
                    if (currentTile == 0)
                    {
                        continue;
                    }
                    let tileObject = this.getTileById(map, currentTile);

                    tileObject.position.x = currentChunk.x + tileIdx % currentChunk.width;
                    tileObject.position.y = currentChunk.y + Math.floor(tileIdx / currentChunk.width);

                    let tileKey = currentLayer.name + ":" + tileObject.position.x + "," + tileObject.position.y;

                    if (this.mapTiles[tileKey] !== undefined)
                    {
                        this.removeObject(tileKey);
                        delete this.mapTiles[tileKey];
                    }
                    this.mapTiles[tileKey] = (tileObject);
                    this.addObject(tileObject, tileKey);
                }
            }
        }
    }

    public preDraw(): boolean
    {
        let ret = super.preDraw();
        if (ret)
        {
            this.currentContext.translate(-this.mapCenter.x * this.mapTileSize.x + this.viewport.width / 2, -this.mapCenter.y * this.mapTileSize.y + this.viewport.height / 2);
            this.currentContext.scale(1 / this.mapScale, 1 / this.mapScale);
        }
        return ret;
    }

    public getTileById(map: tilemap, id: number)
    {
        let tileset = map.tilesets.find(x => id >= x.firstgid && id < x.firstgid + x.tilecount);

        if (tileset === undefined)
        {
            throw "tile error: id '" + id + "' not found";
        }
        
        return new multistateSprite(tileset.texture, tileset, id);
    }
}