import { atom } from "recoil";




export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: '' as string
})

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false as boolean
});

export const trackProgressState = atom({
    key: 'trackProgressState',
    default: 0 as number
});

export const trackDurationState = atom({
    key: 'trackDurationState',
    default: 0 as number
});

export const previousTrackState = atom({
    key: 'previousTrackState',
    default: 0 as number
});

export const nextTrackState = atom({
    key: 'nextTrackState',
    default: 0 as number
});


