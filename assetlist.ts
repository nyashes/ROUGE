declare global {
    interface Window { assets: { [key: string]: any }; }
}

import map0 from "json!./ressources/tilesets/map0.json"
import defaultRPG from "json!./ressources/tilesets/defaultRPG.json"
import Shading from "json!./ressources/tilesets/Shading.json"
import collision from "json!./ressources/tilesets/collision.json"

export function importAssets()
{
    window.assets = {};

    window.assets["map0"] = map0;
    window.assets["defaultRPG"] = defaultRPG;
    window.assets["Shading"] = Shading;
    window.assets["collision"] = collision;
}