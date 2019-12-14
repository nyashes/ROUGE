import { displayModule } from "../moduleDefinition/displayModule";

export abstract class gameObjectVisual
{
    private zPosition: number = 0;

    public abstract draw(displayProvider: displayModule): boolean;

    public getZPosition() { return this.zPosition; }
    public setZOrder(newZ: number, displayProvider: displayModule = null, identifier: any = null) 
    { 
        if (displayProvider) 
        { 
            displayProvider.removeObject(this); 
            this.zPosition = newZ; 
            displayProvider.addObject(this, identifier ? identifier : this); 
        } 
        else this.zPosition = newZ; 
    }
}