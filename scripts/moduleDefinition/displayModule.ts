import { gameObjectVisual } from "../interfaces/gameObjectVisual";

export abstract class displayModule
{
    private objects: Map<any, gameObjectVisual> = new Map<any, gameObjectVisual>();
    private objectOrderLayers: Map<number, Array<any>> = new Map<number, Array<any>>();
    private objectZIndexes: Array<number> = new Array<number>();

    protected abstract preDraw(): boolean;
    protected abstract postDraw(): void;

    public addObject(object: gameObjectVisual, identifier: any = object): boolean
    {
        if (this.objects.has(identifier))
        {
            return false;
        }
        else
        {
            this.objects.set(identifier, object);

            if (!this.objectOrderLayers.has(object.getZPosition()))
            {
                this.objectOrderLayers.set(object.getZPosition(), [identifier]);

                // #todo_perf
                this.objectZIndexes.push(object.getZPosition());
                this.objectZIndexes.sort();
            }
            else
            {
                this.objectOrderLayers.get(object.getZPosition()).push(identifier);
            }
            return true;
        }
    }

    public removeObject(identifier: any): boolean
    {
        if (this.objects.has(identifier))
        {
            let zIndex = this.objects.get(identifier).getZPosition();
            let containingLayer  = this.objectOrderLayers.get(zIndex);
            let posInArray = containingLayer.findIndex(x => x == identifier);
            if (posInArray >= 0)
            {
                containingLayer.splice(posInArray, 1);
            }
            if (containingLayer.length == 0)
            {
                this.objectZIndexes.splice(this.objectZIndexes.findIndex(x => x == zIndex), 1);
                this.objectOrderLayers.delete(zIndex);
            }

            this.objects.delete(identifier);

            return true;
        }
        else
        {
            return false;
        }
    }

    public drawAll = () =>
    {
        if (!this.preDraw())
            return;
        
        this.objectZIndexes.forEach(x => this.objectOrderLayers.get(x).forEach(y => this.objects.get(y).draw(this)));

        this.postDraw();
    }
}