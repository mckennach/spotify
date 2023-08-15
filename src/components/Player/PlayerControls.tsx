import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// import { currentTrackIdState, currentTrackState, isPlayingState } from "../../../atoms/songAtom";

import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

import { currentTrackIdState, nextTrackState, previousTrackState, trackDurationState, trackProgressState } from "../../../atoms/songAtom";
import { millisToMinutesAndSeconds } from "@/lib/time";
import { handlePlayPause } from "@/lib/controls";

// TODO: Figure out Previous and Next Songs

const PlayerControls = ({ isPlaying, setIsPlaying, songInfo }: { isPlaying: boolean, setIsPlaying: any, songInfo: any }) => {
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const duration = useRecoilValue(trackDurationState);
    const progress = useRecoilValue(trackProgressState);
    const previousSong = useRecoilValue(previousTrackState);
    const nextSong = useRecoilValue(nextTrackState)
    const percent = (progress / duration) * 100;
    const [ trackDuration, setTrackDuration ] = useRecoilState(trackDurationState);
    const [ progressPercent, setProgressPercent ] = useState(percent);
    const [ durationReadOut, setDurationReadOut ] = useState(millisToMinutesAndSeconds(duration));
    const [ progressReadOut, setProgressReadOut ] = useState(millisToMinutesAndSeconds(progress));

    
    useEffect(() => {
        if(progress > 0) {
            setProgressPercent((progress / duration) * 100);
            setDurationReadOut(millisToMinutesAndSeconds(duration))
            setProgressReadOut(millisToMinutesAndSeconds(progress))
        }
    }, [duration, progress])
    

    // const handlePreviousSong = () => {
    //     console.log(previousSong);
    //     if(previousSong) {
    //         setCurrentTrackId(previousSong.id);
    //         const { name, artists, album, type, duration_ms: duration, id, uri } = previousSong;
    //         setIsPlaying(true);
    //         setTrackDuration(duration);
    //         console.log(name);
    //         spotifyApi.play({
    //             uris: [uri]
    //         })
    //     }
    // }

    //  const handleNextSong = () => {
    //     if(nextSong) {
    //         setCurrentTrackId(nextSong.id);
    //         const { name, artists, album, type, duration_ms: duration, id, uri } = nextSong;
    //         setIsPlaying(true);
    //         setTrackDuration(duration);
    //         console.log(name);
    //         spotifyApi.play({
    //             uris: [uri]
    //         })
    //     }
    // }

    
 
    return (
        <div className="flex flex-col basis-1/3">
            <div className="flex justify-center mb-2">
                <button className="flex justify-center items-center text-neutral-300 hover:text-neutral-100 scale-100 hover:scale-110 transition-all">
                    <BackwardIcon 
                    // onClick={handlePreviousSong} 
                    className="w-5"  />
                </button>
                <button className="rounded-full p-2 flex items-center justify-center bg-white mr-5 ml-5 scale-100 hover:scale-110 transition-all">
                    {isPlaying ? (
                        <PauseIcon onClick={() => handlePlayPause(setIsPlaying)} className="w-5 transition-all text-neutral-900" />
                    ) : ( 
                        <PlayIcon onClick={() => handlePlayPause(setIsPlaying)} className="w-5 transition-all text-neutral-900" />
                    )} 
                </button>
                <button className="flex justify-center items-center text-neutral-300 hover:text-neutral-100 scale-100 hover:scale-110 transition-all">
                    <ForwardIcon 
                        // onClick={handleNextSong}
                        className="w-5" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="mr-5 text-xs">
                    {progressReadOut}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className={`bg-neutral-200 h-1.5 rounded-full w-0 transition-all`} style={{width: `${progressPercent}%`}}></div>
                </div>
                <div className="ml-5 text-xs">
                    {durationReadOut}
                </div>
            </div>
        </div>

       
    )
}

export default PlayerControls;


