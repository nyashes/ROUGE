import { timeModule } from "../moduleDefinition/timeModule";
import { gameModule } from "../moduleDefinition/gameModule";

export class actionBasedTimeModule extends timeModule
{
    private game: gameModule;

    constructor(game: gameModule)
    {
        super();
        this.game = game;
        this.game.input.onActionRegister(() => this.tick(1));
        this.game.input.onMoveRegister(() => this.tick(1));
    }
}