import { gameModule } from "./moduleDefinition/gameModule";
import { keyboardInputModule } from "./baseModule/keyboardInputModule"
import { actionBasedTimeModule } from "./baseModule/actionBasedTimeModule"
import { gameMapDisplayModule } from "./baseModule/gameMapDisplayModule"
import { frameBasedTimeModule } from "./baseModule/frameBasedTimeModule"
import { gameObject } from "./gameObject/gameObject"
import { Vector } from "./primitives/vector2D"

export class game extends gameModule
{
    private viewport: HTMLCanvasElement;
    private player: gameObject = new gameObject("./ressources/player.jpg");

    constructor(viewport: HTMLCanvasElement)
    {
        super();
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

        console.debug(newPos.x + ", " + newPos.y);
    }
}