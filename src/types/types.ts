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



export interface IArtist {
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string,
    images: IImage[]
}

export interface IAlbumDisplay {
    images: IImage[],
    name: IName
}


export interface IAlbum {
    album_type?: string,
    artists?: IArtist[],
    available_markets?: string[],
    external_urls?: {
        spotify?: string
    },
    href?: string,
    images?: IImage[],
    name?: string,
    release_date?: string,
    release_date_precision?: string,
    total_tracks?: number,
    type?: string,
    uri?: string
}

export interface ITrack {
    album?: IAlbum,
    artists?: IArtist[],
    available_markets?: string[],
    disc_number?: number,
    duration_ms?: number | any,
    episode?: boolean,
    explicit?: boolean,
    external_ids?: string[],
    external_urls?: {
        spotify?: string
    },
    href?: string,
    is_local?: boolean,
    id?: string,
    name?: string,
    popularity?: boolean,
    preview_url?: string,
    track?: boolean,
    track_number?: number,
    type?: string,
    uri?: string
}

export interface ITrackItem {
    added_at: string,
    added_by?: {
        external_urls?: {
            spotify?: string
        },
        href?: string,
        id?: string,
        type?: string,
        uri?: string
    },
    is_local?: boolean,
    primary_color?: null,
    track: ITrack,
    video_thumbnail?: {
        uri?: string | null
    }
}

export interface ITracks {
    href: string,
    items: ITrackItem[],
    limit: number,
    next?: null,
    offset: number,
    previous?: null,
    total: number
}

export interface IPlaylist {
    collaborative: Boolean,
    description: String,
    external_urls?: IExternalUrls,
    followers?: {
        href?: String,
        total: number
    },
    href: string,
    id: string,
    images: IImage[],
    name: string,
    owner: IOwner | undefined,
    primary_color: string | null | undefined,
    public?: boolean | null,
    snapshot_id: string,
    tracks: ITracks,
    type?: string
}

