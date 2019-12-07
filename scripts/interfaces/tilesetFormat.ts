export type tilesetOrientation = "orthogonal" | "isometric" | "staggered" | "hexagonal";
export type tilesetRenderOrder = "right-down" | "right-up" | "left-down" | "left-up";

export interface Tilemap
{
    backgroundcolor: string;
    height: number;
    hexsidelength: number;
    infinite: boolean;
    layers: Array<any>;
    nextlayerid: number;
    nextobjectid: number;
    orientation: tilesetOrientation;
    properties: Array<any>;
    renderorder: tilesetRenderOrder;
    staggeraxis: string;
    staggerindex: string;
    tiledversion: string;
    tileheight: number;
    tilesets: Array<any>;
    tilewidth: number;
    type: string;
    version: number;
    width: number;
}