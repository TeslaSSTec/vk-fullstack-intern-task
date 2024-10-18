export interface userDataDto {
    id: string,
    login: string
}

export interface userCredentialsDto {
    login: string
    password:string
}

export interface catsDto {
    id: string,
    url: string,
    width: number,
    height: number
}

export interface favoriteCatsDto{
    "id": string,
    "userId": string,
    "catId": string,
    "url": string,
    "createdAt": string
}

export interface createLikeDto {
    cat_id:string,
    url:string
}