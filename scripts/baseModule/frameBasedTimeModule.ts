import { timeModule } from "../moduleDefinition/timeModule";
import { gameModule } from "../moduleDefinition/gameModule";

export class frameBasedTimeModule extends timeModule
{
    private game: gameModule;
    private lastFrameTimestamp : number = -1;

    constructor(game: gameModule)
    {
        super();
        this.game = game;
        window.requestAnimationFrame(this.onHardwareFrame);
    }

    private onHardwareFrame = () => {
        let currentFrameTimestamp = Date.now();
        if (this.lastFrameTimestamp != -1)
        {
            this.tick(currentFrameTimestamp - this.lastFrameTimestamp);
        }
        this.lastFrameTimestamp = currentFrameTimestamp;
        window.requestAnimationFrame(this.onHardwareFrame);
    };
}