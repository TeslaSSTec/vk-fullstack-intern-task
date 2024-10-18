export interface ILayoutCatImage {
    id:string,
    url:string,
    isLiked:boolean
}

export interface ICatsSlice {
    cats: ILayoutCatImage[];
    likes:{[key:string]:ILayoutCatImage};
}