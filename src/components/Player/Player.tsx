
import { useState, useEffect, useCallback } from "react";
import { useRecoilState} from "recoil";
import { currentTrackIdState, trackProgressState, isPlayingState } from "../../../atoms/songAtom";
import { useSession } from "next-auth/react";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";
import PlayerControls from "./PlayerControls";
import VolumeControls from "./VolumeControls";
import { debounce } from "lodash";
import PlayerSongView from "./PlayerSongView";


const Player = () => {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const songInfo = useSongInfo();
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const [ trackProgress, setTrackProgress ] = useRecoilState(trackProgressState);
    const [ volume, setVolume ] = useState(100);

    
    
    const fetchCurrentSong = () => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
            .then(data => {
                const trackId = data?.body?.item ? data.body.item.id : '';
                setCurrentTrackId(trackId)
            });
          
            spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                setIsPlaying(data.body?.is_playing)
            });
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(100);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if(volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])


    useEffect(() => {
      if(isPlaying) {
        setInterval(checkProgress, 1000);
      }
    }, [isPlaying])
    
    const checkProgress = () => {
        spotifyApi.getMyCurrentPlaybackState()
        .then(data => {
            const progress: number = data.body.progress_ms != null ? data.body.progress_ms : 0;
            setTrackProgress(progress);
        });
    }


    const debouncedAdjustVolume = useCallback(
      debounce((volume) => {

        spotifyApi.setVolume(parseInt(volume)).catch(err => {});
      }, 1000), []
    )

    
    
    return (
        <div className="sticky bottom-0 z-10  bg-gradient-to-b from-neutral-900 to-neutral-800 text-neutral-500">
            <div className="flex w-full p-3 justify-between items-center">
                {
                    songInfo ? (
                        <PlayerSongView songInfo={songInfo} />
                    ) : (
                        <div className="basis-1/3"></div>
                    )
                }
                
                <PlayerControls songInfo={songInfo} isPlaying={isPlaying} setIsPlaying={setIsPlaying}  />
                
                <VolumeControls volume={volume} setVolume={setVolume} />
      
            </div>
          
        </div>
    )
}

export default Player;