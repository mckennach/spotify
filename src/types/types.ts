export interface IProvider {
    name: string,
    id: string
}

export interface IColor {
    color: string | null | undefined
}

export interface ISetColor {
    setColor: ([]) => IColor
}

export interface IExternalUrls { 
    external_urls?: {
        spotify: String
    }
}

export interface IImage {
    height: number,
    width: number,
    url: string
}

export interface IImageArray {
    images: IImage[]
}

export interface IName {
    name: string
}

export interface IType {
    type: string
}

export interface IHREF {
    href: string
}

export interface IUri {
    href: string
}

export interface IID {
    id: string
}

export interface IOwner {
    display_name: string,
    external_urls: IExternalUrls,
    href: IHREF,
    id: IID | string,
    type: IType,
    uri: IUri
}

export interface IUser extends IOwner {
   images: IImage[]
}
