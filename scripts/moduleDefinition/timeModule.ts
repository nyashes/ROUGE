import { customEvent } from "../primitives/customEvent";

export type onTickDelegate = (elapsedTime : number) => void;
export abstract class timeModule
{
    private onTickEvent: customEvent<onTickDelegate> = new customEvent<onTickDelegate>();
    private totalElapsedTime: number = 0;

    //import registration
    public registerOnce(callback: onTickDelegate): boolean { return this.onTickEvent.register(x => { callback(x); this.unregister(callback); }, callback); };
    public register: { (cb: onTickDelegate, k?: any): boolean } = this.onTickEvent.register.bind(this.onTickEvent);
    public unregister: { (k: any): boolean }  = this.onTickEvent.unregister.bind(this.onTickEvent);

    //public interface
    public getTotalElapsedTime: {(): number} =  () => this.totalElapsedTime;

    protected tick(elapsedTime: number): void //elapsed
    {
        this.totalElapsedTime += elapsedTime;
        this.onTickEvent.trigger(elapsedTime);
    }
}