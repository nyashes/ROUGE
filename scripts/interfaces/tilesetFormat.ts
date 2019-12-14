export type tilesetOrientation = "orthogonal" | "isometric" | "staggered" | "hexagonal";
export type tilesetRenderOrder = "right-down" | "right-up" | "left-down" | "left-up";
export type tilesetDrawOrder = "topdown" | "index" | "objectgroup";
export type tilesetEncoding = "csv" | "base64" | "tilelayer";
export type tilesetCompression = "zlib" | "gzip" | "tilelayer";
export type tilesetType = "tilelayer" | "objectgroup" | "imagelayer" | "group";
export type tilesetPropertyType = "string" | "int" | "float" | "bool" | "color" | "file";

export interface tilemap
{
    backgroundcolor?: string;
    height: number;
    hexsidelength?: number;
    infinite: boolean;
    layers: Array<layer>;
    nextlayerid: number;
    nextobjectid: number;
    orientation: tilesetOrientation;
    properties?: Array<property>;
    renderorder: tilesetRenderOrder;
    staggeraxis?: string;
    staggerindex?: string;
    tiledversion: string;
    tileheight: number;
    tilesets: Array<tileset>;
    tilewidth: number;
    type: string;
    version: number;
    width: number;
}

export interface layer
{
    chunks: Array<chunk>;
    compression?: tilesetCompression;
    data?: Array<number>;
    //draworder: tilesetDrawOrder;
    encoding?: tilesetEncoding;
    height: number;
    id: number;
    //image: string;
    //layers: Array<layer>;
    name: string;
    //objects: Array<object>;
    offsetx?: number;
    offsety?: number;
    opacity: number;
    properties?: Array<property>;
    startx: number;
    starty: number;
    transparentcolor?: string;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export interface chunk
{
    data: Array<number>;
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface tileset
{
    //custom addition
    texture?: HTMLImageElement;

    //standard
    backgroundcolor?: string;
    columns?: number;
    firstgid: number;
    //grid: grid;
    image?: string;
    imageheight?: number;
    imagewidth?: number;
    margin?: number;
    name?: string;
    properties?: Array<property>;
    source?: string;
    spacing?: number;
    //terrains: array<terrain>;
    tilecount?: number;
    tiledversion?: string;
    tileheight?: number;
    //tileoffset: ;
    //tiles: Array<tile>;
    tilewidth?: number;
    transparentcolor?: string;
    type?: string;
    version?: number;
    //wangsets: Array<wangSet>;
}

export interface property
{
    name: string;
    type: string;
    value: string | number | boolean
}