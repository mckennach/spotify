import { atom } from "recoil";
import { IPlaylist } from "@/types/types";

export const playlistsState = atom({
    key: 'playslistsState',
    default: []
});

export const playlistIdPlayingState = atom({
    key: 'playlistIdPlayingState',
    default: ''
})

export const playlistState = atom({
    key: 'playlistState',
    default: null as IPlaylist | null
})


export const playlistIdState = atom({
    key: "playlistIdState",
    default: ''
});