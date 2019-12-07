import { gameObjectVisual } from "../interfaces/gameObjectVisual";

export abstract class displayModule
{
    private objects: Map<any, gameObjectVisual> = new Map<any, gameObjectVisual>();

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
            return true;
        }
    }

    public removeObject(identifier: any): boolean
    {
        if (this.objects.has(identifier))
        {
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

        this.objects.forEach((v, k) => {
            v.draw(this);
        });

        this.postDraw();
    }
}