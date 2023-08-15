
export interface Image {
    height: number,
    width: number,
    url: string
}

export interface Artist {
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}



export interface Album {
    album_type: string,
    artists: Artist[],
    available_markets: string[],
    external_urls: {
        spotify: string
    },
    href: string,
    images: Image[],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}

export interface Track {
    album: Album[],
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    episode: boolean,
    explicit: boolean,
    external_ids: string[],
    external_urls: {
        spotify: string
    },
    href: string,
    is_local: boolean,
    id: string,
    name: string,
    popularity: boolean,
    preview_url: string,
    track: boolean,
    track_number: number,
    type: string,
    uri: string
}