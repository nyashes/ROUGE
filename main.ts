/// <reference path='asset.d.ts' />

import { game } from "./scripts/game";
import { gameMapDisplayModule } from "./scripts/baseModule/gameMapDisplayModule";
import { tilemap } from "./scripts/interfaces/tilesetFormat";
import { importAssets } from "./assetlist";

declare global {
    interface Window { game: game; }
}

window.onload = async () => {
    importAssets();
    window.game = new game(document.getElementById("game") as HTMLCanvasElement);

    //(window.game.display as gameMapDisplayModule).importMapFromFile(await (window.game.display as gameMapDisplayModule).loadMapFile("json!ressources/tilesets/map0.json"), true);
}