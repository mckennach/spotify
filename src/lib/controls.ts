import spotifyApi from "./spotify";


export const playSong = (id: string, playlistId?: string, uri: string, duration: number, setCurrentTrackId: any, setIsPlaying: any, setTrackDuration: any, setPlaylistIdPlaying?: any) => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    setTrackDuration(duration);
    spotifyApi.play({
        uris: [uri]
    }).then(() => {
        if(setPlaylistIdPlaying) {
            setPlaylistIdPlaying(playlistId);
        }
    })
}

export const pauseSong = (setIsPlaying: any, setPlaylistIdPlaying?: any) => {
    spotifyApi.pause().then(() => {
        setIsPlaying(false);  
        if(setPlaylistIdPlaying) {
            setPlaylistIdPlaying(false);
        }
    })
}


export const handlePlaylistPlayPause = async (session: any, setIsPlaying: any, isPlaying?: boolean, setPlaylistIdPlaying?: any, playlistIdPlaying?: string, setCurrentTrackId?: any, setTrackDuration?: any, id?: string) => {
    if(id && session) {
        spotifyApi.getPlaylistTracks(id).then(data => {
            const { body } = data;
            if(body.total > 0) { 
                const { track } = body.items?.[0];
                const { id: setId , uri, duration_ms: duration }: { id: string, uri: string } = track;
                if(isPlaying && id == playlistIdPlaying) {
                    pauseSong(setIsPlaying, setPlaylistIdPlaying);
                } else {
                    playSong(setId, id, uri, duration, setCurrentTrackId, setIsPlaying, setTrackDuration, setPlaylistIdPlaying);
                }
            }
        });
    }
}

export const handlePlayPause = (setIsPlaying: any) => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
        if(data.body.is_playing) {
            spotifyApi.pause().then(() => {
                setIsPlaying(false);
            });
        } else {
            spotifyApi.play().then(() => {
                setIsPlaying(true);
            });
        }
    }); 
}

