import { inputModule } from "../moduleDefinition/inputModule";
import { gameModule } from "../moduleDefinition/gameModule";
import { Vector } from "../primitives/vector2D";

export class keyboardInputModule extends inputModule
{
    private game: gameModule;
    private currentDirection: Vector = new Vector();

    constructor(game: gameModule)
    {
        super();
        this.game = game;

        document.addEventListener("keypress", this.keyboardEventHandler);
    } 

    private keyboardEventHandler = (event: KeyboardEvent) =>
    {
        this.currentDirection.x = this.currentDirection.y = 0;
        switch (event.code)
        {
            case "KeyS":
            case "ArrowDown":
                // Handle "back"
                this.currentDirection.y += 1; 
                break;
            case "KeyW":
            case "ArrowUp":
                // Handle "forward"
                this.currentDirection.y -= 1;
                break;
            case "KeyA":
            case "ArrowLeft":
                // Handle "left"
                this.currentDirection.x -= 1;
                break;
            case "KeyD":
            case "ArrowRight":
                // Handle "right"
                this.currentDirection.x += 1;
                break;
            case "Space":
                this.onActionButtonEvent.trigger();
        }

        if (!this.currentDirection.equals(new Vector(0, 0)))
        {
            this.onMoveButtonEvent.trigger(this.currentDirection);
        }
    }

    getDirection(): Vector {
        return this.currentDirection;
    }
}