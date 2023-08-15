import { atom } from "recoil";


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
    default: null
})


export const playlistIdState = atom({
    key: "playlistIdState",
    default: null
});