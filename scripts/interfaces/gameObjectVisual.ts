import { displayModule } from "../moduleDefinition/displayModule";

export abstract class gameObjectVisual
{
    public abstract draw(displayProvider: displayModule): boolean;
}