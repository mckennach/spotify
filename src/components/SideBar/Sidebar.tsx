import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import Router from "next/router";
import { playlistIdState } from "../../../atoms/playlistAtom";
import { useRecoilState, } from "recoil";
import PlaceholderImage from "../PlaceholderImage";

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
    useEffect(() => {
      if(spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
        });
      }
    }, [session, spotifyApi]);


    return (
        <aside id="sidebar-multi-level-sidebar" className=" w-64 h-screen transition-transform text-xs lg:text-sm lg:max-w-[15rem] hidden md:inline-flex" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-900">
                <div className="space-y-2 font-small">
                   

                    <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer">
                        <HomeIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="ml-3">Home</span>
                    </button>
                    <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer" >
                        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Search</span>
                    </button>
                    <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer">
                        <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Playlists</span>
                    </button>

                    <hr className="border-t-[0.1px] border-neutral-500"/>

                    <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer">
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Create Playlist</span>
                    </button>

                     <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer">
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Liked Songs</span>
                    </button>

                     <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer">
                        {/* <BuildingLibraryIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> */}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Your Episodes</span>
                    </button>

                    <hr className="border-t-[0.1px] border-neutral-500"/>

                    {playlists.map((playlist) => {
                            const { id, name, images, type }: { id: any, name: any} = playlist;
                            // const featuredImage = images.length > 0 ? return (
                            //     <img src={images[0].url} alt={`${name} ${type}`} />
                            // ) : null;
                            const isActive = playlistId == id ? 'bg-neutral-700' : '';
                            return (
                                <button key={id} 
                                        onClick={() => setPlaylistId(id)}
                                        className={`flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-white dark:hover:bg-neutral-600 cursor-pointer ${isActive}`}>
                                     {
                                        images?.length > 0 ?
                                        (
                                            <img src={images[0].url} alt={`${name} ${type}`} className="w-10 h-10" />
                                        ) :
                                        (
                                            <PlaceholderImage classes={`w-10 h-10 bg-neutral-600`} />
                                        )
                                    }
            
                                    {/* <img src={images[0].url} alt={`${name} ${type}`} className="w-10 h-10" />    */}
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