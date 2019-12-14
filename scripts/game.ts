import { gameModule } from "./moduleDefinition/gameModule";
import { keyboardInputModule } from "./baseModule/keyboardInputModule"
import { actionBasedTimeModule } from "./baseModule/actionBasedTimeModule"
import { gameMapDisplayModule } from "./baseModule/gameMapDisplayModule"
import { frameBasedTimeModule } from "./baseModule/frameBasedTimeModule"
import { gameObject } from "./gameObject/gameObject"
import { Vector } from "./primitives/vector2D"
import { tilemap } from "./interfaces/tilesetFormat";
import { jsonTsBundleAssetModule } from "./baseModule/jsonTsBundleAssetModule"

export class game extends gameModule
{
    private viewport: HTMLCanvasElement;
    private player: gameObject = new gameObject("./ressources/player.jpg", null, 0, 100);

    public getDisplay(): gameMapDisplayModule { return this.display as gameMapDisplayModule; } 

    constructor(viewport: HTMLCanvasElement)
    {
        super();
        this.assets = new jsonTsBundleAssetModule();

        this.viewport = viewport;
        this.display = new gameMapDisplayModule(this.viewport);

        this.input = new keyboardInputModule(this);

        this.gameTime = new actionBasedTimeModule(this);
        this.gameTime.register(this.update);

        this.graphTime = new frameBasedTimeModule(this);
        this.graphTime.register(this.display.drawAll);

        this.display.addObject(this.player.sprite);
    }

    private update = (elapsed: number) =>
    {
        let newPos = this.player.getPosition().add(this.input.getDirection());
        this.player.setPosition(newPos.x, newPos.y);
        this.getDisplay().mapCenter.x = newPos.x;
        this.getDisplay().mapCenter.y = newPos.y;

        console.debug(newPos.x + ", " + newPos.y);
    }
}