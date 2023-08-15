import { millisToMinutesAndSeconds } from "@/lib/time";
import { Album, Track } from '@/types/Tracks';
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState, nextTrackState, previousTrackState, trackDurationState } from "../../../atoms/songAtom";
import spotifyApi from "@/lib/spotify";
const Song = ({ order, track, previousSong, nextSong }: { order: number, track: Track, previousSong: any, nextSong: any }) => {
  
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const [ trackDuration, setTrackDuration ] = useRecoilState(trackDurationState);
    const [ nextTrack, setNextTrack ] = useRecoilState(nextTrackState);
    const [ previoustTrack, setPreviousTrack ] = useRecoilState(previousTrackState);
    const { name, artists, album, type, duration_ms: duration, id, uri } = track;
    const { images, name: albumName }: Album = album;
    const artistList = artists.map(artist => artist.name).join('');


    const playSong = () => {
        console.log(nextSong);
        setNextTrack(nextSong);
        setPreviousTrack(previousSong);
        setCurrentTrackId(id);
        setIsPlaying(true);
        setTrackDuration(duration);
        spotifyApi.play({
            uris: [uri]
        })
    }

    return (
        <button 
            onClick={playSong}
            className="grid p-2 grid-cols-2 text-left text-sm text-neutral-600 transition duration-75 group hover:bg-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-700 cursor-pointer">
            <div className="flex items-center space-x-4 ">
                <p>{ order + 1 }</p>
                <img src={images[0].url} alt={`${name} ${type}`} className="w-10 h-10" />   
                <div className="">
                    <p className="w-36 lg:w-64 text-neutral-300 truncate">{ name }</p>
                    <p className="w-40 truncate text-xs">{ artistList }</p>
                </div>
            </div>
            {/* <div className="flex items-center justify-between ml-auto md:ml-0"> */}
            <div className="flex items-center justify-between ml-auto h-full md:ml-0">     
                <p className="w-56 hidden md:block truncate">{ albumName }</p>
                <p>{ millisToMinutesAndSeconds(duration) }</p>
            </div>
        </button>
    )
}

export default Song;