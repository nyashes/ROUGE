import { assetModule } from "../moduleDefinition/assetModule";
import { tilemap, tileset } from "../interfaces/tilesetFormat";

export class jsonTsBundleAssetModule extends assetModule
{
    protected loadFromSourceImpl<TResult>(aSource: string, specialAssetType: "tilemap" | "tileset" | "" = ""): TResult 
    {
        if (window.assets[aSource] === undefined)
        {
            throw "asset '" + aSource + "' not found";
        }

        let ret = window.assets[aSource] as TResult;

        switch(specialAssetType)
        {
            case "tilemap":
                let tilemap = ret as unknown as tilemap;
                tilemap.tilesets = tilemap.tilesets.map(x => { let y = {...this.loadFromSourceImpl<tileset>(x.source.substring(0, x.source.length - 5), "tileset")}; y.firstgid = x.firstgid; return y; });
                break;

            case "tileset":
                let tileset = ret as unknown as tileset;
                tileset.texture = new Image(tileset.imagewidth, tileset.imageheight);
                tileset.texture.src = "./ressources/tilesets/" + tileset.image;
                break;
        }

        return ret;
    }
}