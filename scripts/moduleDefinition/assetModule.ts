export abstract class assetModule
{
    public readonly assetBank: Map<string, any> = new Map<string, any>();

    public loadFromSource<TResult>(aSource: string, forceReload: boolean = false, ...args: any[]): TResult
    {
        if (!this.assetBank.has(aSource) || forceReload)
        {
            args.unshift(aSource);
            this.assetBank.set(aSource, this.loadFromSourceImpl.apply(this, args));
        }
        return this.assetBank.get(aSource);
    }

    protected abstract loadFromSourceImpl<TResult>(aSource: string): TResult;
}