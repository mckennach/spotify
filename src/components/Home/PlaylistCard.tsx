import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import Image from "next/image";
import PlaceholderImage from "../PlaceholderImage";
import { useSession } from "next-auth/react";

// Types
import { IImage } from "@/types/types";

// Atoms
import { playlistIdPlayingState, playlistIdState } from "../../../atoms/playlistAtom";
import { currentTrackIdState, trackDurationState } from "../../../atoms/songAtom";
import { viewState } from "../../../atoms/viewAtom";


// Libs
import { imageLoader } from "@/lib/images";
import { handlePlaylistPlayPause } from "@/lib/controls";



const PlaylistCard = ({ playlist, isPlaying, setIsPlaying }: { playlist: any, isPlaying: boolean, setIsPlaying: any}) => {
    const { data: session } = useSession();
    const { id, name, images, type }: { id: string, name: string, images: IImage[], type: string} = playlist;
    const { url }: { url: string } = images[0];
    const isActive = '';
    const [ playlistIdPlaying, setPlaylistIdPlaying ] = useRecoilState(playlistIdPlayingState);
    const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);
    const [ activeView, setActiveView ] = useRecoilState(viewState);
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ trackDuration, setTrackDuration ] = useRecoilState(trackDurationState);

    return (
        <div 
            className={`basis-1/3 relative group overflow-hidden sm:max-w-sm w-full lg:max-w-full flex  items-center h-20 text-sm text-gray-800 transition duration-75 rounded-lg group dark:bg-neutral-700 hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer ${isActive}`}>
            <button 
             onClick={() => {
                    setPlaylistId(id)
                    setActiveView('playlist');
            }}     
            className="relative  h-full">
                    {images?.length > 0 ?
                        (
                            <Image 
                                loader={imageLoader}
                                src={url} 
                                alt={`${name} ${type}`}
                                width={80}
                                height={80}
                                quality={100}
                                className="w-20 h-20"  />
                        ) :
                        (
                            <PlaceholderImage classes={`w-10 h-10 bg-neutral-600`} />
                    )}
            </button>
            <button  
                onClick={() => {
                    setPlaylistId(id)
                    setActiveView('playlist');
                }}
                className="h-full flex items-center px-4">
                <span className="flex-1 text-left font-semibold">{name}</span>
            </button>
            
            <button className={`absolute right-0 rounded-full p-2 flex items-center justify-center bg-white mr-5 ml-5 scale-100 hover:scale-110 transition-all group-hover:block ${ playlistIdPlaying == id && isPlaying ? 'block' : 'hidden' }`}>
                {isPlaying && playlistIdPlaying == id ? (
                    <PauseIcon 
                        onClick={() => handlePlaylistPlayPause(session, setIsPlaying, isPlaying, setPlaylistIdPlaying, playlistIdPlaying, setCurrentTrackId, setTrackDuration, id)} 
                        className="w-5 transition-all text-neutral-900" />
                ) : ( 
                    <PlayIcon 
                        onClick={() => handlePlaylistPlayPause(session, setIsPlaying, isPlaying, setPlaylistIdPlaying, playlistIdPlaying, setCurrentTrackId, setTrackDuration, id)} 
                        className="w-5 transition-all text-neutral-900" />
                )} 
            </button>
        
    </div>
    )
}

export default PlaylistCard;