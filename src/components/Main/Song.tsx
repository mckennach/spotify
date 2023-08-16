
import { millisToMinutesAndSeconds } from "@/lib/time";
import { IArtist, ITrack } from '@/types/tracks';
import { useRecoilState } from "recoil";


// Components
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import PlaceholderImage from "../PlaceholderImage";
import { imageLoader } from "@/lib/images";


// Atoms
import { playlistIdPlayingState } from "../../../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState, nextTrackState, previousTrackState, trackDurationState } from "../../../atoms/songAtom";


// Libs

import useSpotify from "@/hooks/useSpotify";
import { playSong, handlePlaylistPlayPause } from "@/lib/controls";


const Song = ({ order, track, previousSong, nextSong, playlistId, selectedTrackId, setSelectedTrackId }: { order: number, track: ITrack | null | undefined, previousSong: any, nextSong: any, playlistId: string, selectedTrackId: string, setSelectedTrackId: any }) => {
    
    // const { data: session } = useSession();
    // const spotifyApi = useSpotify();
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const [ trackDuration, setTrackDuration ] = useRecoilState(trackDurationState);
    const [ playlistIdPlaying, setPlaylistIdPlaying ] = useRecoilState(playlistIdPlayingState);
    // const [ nextTrack, setNextTrack ] = useRecoilState(nextTrackState);
    // const [ previoustTrack, setPreviousTrack ] = useRecoilState(previousTrackState);


    const { name, artists, album, type, duration_ms: duration, id, uri }: any = track;
    const { images, name: albumName } = album;
    const artistList = artists.map((artist: IArtist) => artist.name).join('');
    

    return (
        <button 
            onClick={() => setSelectedTrackId(id)}
            onDoubleClick={() => playSong(id, playlistId, uri, duration, setCurrentTrackId, setIsPlaying, setTrackDuration, setPlaylistIdPlaying)}
            className={`grid p-2 grid-cols-2 text-left text-sm text-neutral-600 transition duration-75 group hover:bg-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-700 ${selectedTrackId == id ? 'hover:bg-neutral-70 dark:bg-neutral-700 ' : ''} cursor-pointer`}>
            <div className="flex items-center space-x-4 ">
                <div>
                    <div className={`rounded-full mr-[0.5rem] relative  items-center justify-center ${ isPlaying && currentTrackId == id ? 'flex' : 'hidden group-hover:flex' }`}>
                        {isPlaying && currentTrackId == id ? (
                            <PauseIcon 
                         
                                className="w-4 absolute right-0 left-[-1px]  transition-all text-neutral-100" />
                        ) : ( 
                            <PlayIcon 
                                
                                className="w-4 absolute right-0 left-[-2px] transition-all text-neutral-100" />
                        )} 
                    </div>
                    <span className={`${ isPlaying && currentTrackId == id ? 'hidden' : 'block group-hover:hidden' }`}>{ order + 1 }</span>
                </div>
                {
                    images ? (
                        <Image 
                            loader={imageLoader}
                            src={images[0].url}
                            alt={`${name} ${type}`}
                            className="w-10 h-10"
                            width={images[0].width}
                            height={images[0].height}
                            quality={100}
                        />
                    ) : (
                        <PlaceholderImage classes="w-10 h-10" />
                    ) 
                }
                
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