import { IImage, IID, IExternalUrls, IHREF, IName, IOwner } from "./types";
import { ITracks, ITrack } from "./tracks";




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

