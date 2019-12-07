import { displayModule } from "../moduleDefinition/displayModule";
import { gameObjectVisual } from "../interfaces/gameObjectVisual";
import { Vector } from "../primitives/vector2D";

export class canvasDisplayModule extends displayModule
{
    public mapTileSize: Vector = new Vector(32, 32);

    protected viewport: HTMLCanvasElement;
    protected currentContext: CanvasRenderingContext2D;

    constructor(viewport: HTMLCanvasElement)
    {
        super();
        this.viewport = viewport;
    }

    public getContext(): CanvasRenderingContext2D { return this.currentContext; }

    protected preDraw(): boolean 
    {
        this.currentContext = this.viewport.getContext("2d");
        this.currentContext.clearRect(0, 0, this.viewport.width, this.viewport.height);

        return true;
    }    
    
    protected postDraw(): void 
    {
        this.currentContext.resetTransform();
        this.currentContext = null;
    }
}