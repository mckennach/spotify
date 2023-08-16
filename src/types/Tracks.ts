import { IImage, IImageArray, IName } from "./types";
import { IHREF } from "./types";

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

