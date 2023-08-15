import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: null
})
export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false
});

export const trackProgressState = atom({
    key: 'trackProgressState',
    default: 0
});

export const trackDurationState = atom({
    key: 'trackDurationState',
    default: 0
});

export const previousTrackState = atom({
    key: 'previousTrackState',
    default: 0
});

export const nextTrackState = atom({
    key: 'nextTrackState',
    default: 0
});


