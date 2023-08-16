// Hooks
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";

// Components
import PlaceholderImage from "../PlaceholderImage";
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Atoms
import { viewState } from "../../../atoms/viewAtom";
import { playlistIdState, playlistsState } from "../../../atoms/playlistAtom";
import { imageLoader } from "@/lib/images";
import { IPlaylist } from "@/types/types";

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession()
    const [ playlists, setPlaylists ] = useRecoilState(playlistsState);
    const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);
    const [ activeView, setActiveView ] = useRecoilState(viewState);
    useEffect(() => {
      if(spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then((data) => {
            const { body }: { body: any } = data;

            setPlaylists(body.items);
        });
      }
    }, [session, spotifyApi]);

    // useEffect(() => {
    //   if(spotifyApi.getAccessToken()) {
        
    //   }
    // }, [session, activeView]);


    return (
        <aside id="sidebar-multi-level-sidebar" className="w-64 h-screen transition-transform text-xs lg:text-sm lg:max-w-[15rem] hidden md:inline-flex" aria-label="Sidebar">
            <div className="h-full px-3 py-4 pb-24 overflow-y-auto bg-neutral-900">
                <div className="space-y-2 font-small">
                    <button 
                        type="button" 
                        onClick={() => setActiveView('home')}  
                        className={`${activeView == 'home' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>
                        <HomeIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="ml-3">Home</span>
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setActiveView('search')}
                        className={`${activeView == 'search' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>
                        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Search</span>
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setActiveView('playlists')}  
                        className={`${activeView == 'playlists' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>

                        <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Playlists</span>
                    </button>

                    <hr className="border-t-[0.1px] border-neutral-500"/>

                    <button 
                        type="button"
                        onClick={() => setActiveView('create-playlist')}   
                        className={`${activeView == 'create-playlist' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Create Playlist</span>
                    </button>

                     <button 
                        type="button" 
                        onClick={() => setActiveView('liked-songs')}  
                        className={`${activeView == 'liked-songs' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Liked Songs</span>
                    </button>

                     <button 
                        type="button" 
                        onClick={() => setActiveView('episodes')}  
                        className={`${activeView == 'episodes' ? 'bg-neutral-700' : ''} flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer`}>
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Your Episodes</span>
                    </button>

                    <hr className="border-t-[0.1px] border-neutral-500"/>

                    {playlists.map((playlist: IPlaylist) => {
                            const { id, name, images, type } = playlist;
                            const isActive = playlistId == id && activeView == 'playlist' ? 'bg-neutral-700' : '';
                            return (
                                <button key={id} 
                                        onClick={() => {
                                            setPlaylistId(id)
                                            setActiveView('playlist');
                                        }}
                                        className={`flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer ${isActive}`}>
                                        {images?.length > 0 ? (
                                                <Image 
                                                    loader={imageLoader}
                                                    width={200}
                                                    height={200}
                                                    quality={100}
                                                    src={images[0].url} 
                                                    alt={`${name} ${type}`} 
                                                    className="w-10 h-10"
                                                />
                
                                            ) : (
                                                <PlaceholderImage classes={`w-10 h-10 bg-neutral-600`} />
                                        )}
    
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">{name}</span>
                                </button>
                            )
                    })}



              </div>
            </div>
        </aside>
    )
};

export default Sidebar;