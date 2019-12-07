import { customEvent } from '../primitives/customEvent'
import { Vector } from "../primitives/vector2D"

export abstract class inputModule 
{
    abstract getDirection(): Vector;
    
    protected onActionButtonEvent: customEvent = new customEvent();
    protected onMoveButtonEvent: customEvent<{(direction: Vector): void}> = new customEvent<{(direction: Vector): void}>();

    public onActionRegister: {(callback: {(): void}, identifier?: any): boolean} = this.onActionButtonEvent.register.bind(this.onActionButtonEvent);
    public onActionUnregister: {(identifier: any): boolean} = this.onActionButtonEvent.unregister.bind(this.onActionButtonEvent);

    public onMoveRegister: {(callback: {(direction: Vector): void}, identifier?: any): boolean} = this.onMoveButtonEvent.register.bind(this.onMoveButtonEvent);
    public onMoveUnregister: {(identifier: any): boolean} = this.onMoveButtonEvent.unregister.bind(this.onMoveButtonEvent);
}