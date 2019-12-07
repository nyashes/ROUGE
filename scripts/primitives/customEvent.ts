export class customEvent<eventHandler = {(): void}>
{
    private callbackMap: Map<any, eventHandler> = new Map<any, eventHandler>();
    public register(callback: eventHandler, identifier: any = callback): boolean
    {
        if (this.callbackMap.has(identifier)) 
        {
            return false;
        }
        else 
        {
            this.callbackMap.set(identifier, callback);
            return true;
        }
    }

    public unregister(identifier: any): boolean
    {
        if (this.callbackMap.has(identifier)) 
        {
            this.callbackMap.delete(identifier);
            return true;
        }
        else 
        {
            return false;
        }
    }

    public trigger: eventHandler = ((... args: any[]) =>
    {
        this.callbackMap.forEach((v, k) => {
            (v as unknown as { (... args: any[]): void }).apply(k, args);
        });
    }) as unknown as eventHandler;
}