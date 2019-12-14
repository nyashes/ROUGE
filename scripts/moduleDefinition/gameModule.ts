import { timeModule } from "./timeModule";
import { inputModule } from "./inputModule";
import { displayModule } from "./displayModule";
import { assetModule } from "./assetModule";

export class gameModule
{
    public assets: assetModule;
    public gameTime: timeModule;
    public graphTime: timeModule;
    public input: inputModule;
    public display: displayModule;
}