import { useEffect, useState, Dispatch } from "react";

import { useSession } from "next-auth/react";
import { shuffle } from 'lodash'; 
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../../atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import PlaceholderImage from "../PlaceholderImage";
import LoadingScreen from "../LoadingScreen";
import Image from "next/image";
import { IUser } from "@/types/types";
import { imageLoader } from "@/lib/images";
const PlaylistHeading = () => {
    const { data: session, status } = useSession();
    const [ color, setColor ] = useState<string | undefined | null>('');
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [ playlist, setPlaylist ] = useRecoilState(playlistState);
    const [ user, setUser ] = useState<IUser | undefined | null>(null);
    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500'
    ];

    
    

    useEffect(() => {
        const getColor: string | undefined | null = shuffle(colors).pop();
        setColor(getColor);
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
        .then((data) => {
            const { body }: { body: any | null | undefined } = data;
            setPlaylist(body); 
        })
        .catch((err) => console.warn('Something went wrong', err));
    }, [spotifyApi, playlistId])

    useEffect(() => {
       if(playlistId) {
            const owner =  playlist?.['owner'];
            const ownerID: any = owner?.['id'];
            if(ownerID) {
                spotifyApi.getUser(ownerID)
                .then((data) => {
                    const { body }: { body: any | null | undefined } = data;
                    setUser(body);
                });
            }
            
        }  
    
    }, [spotifyApi, playlist])



    if(!playlist) return <LoadingScreen color={color} />
    
 

    const playlistTitle = playlist?.['public'] ? 'Public Playlist' : 'Private Playlist';
    const trackCount = `${playlist?.['tracks']['total']} songs`;
   
    const owner = user ? user?.['display_name'] : playlist?.['owner']?.['display_name'];
    const userImage = user ? user?.['images']?.[0]?.['url'] : null;
    const { name }: { name: string } = playlist;


    return(
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-800 px-5 py-5 ${color} h-80`}>
            {
                playlist && playlist?.['images'] && playlist['images'].length ?
                    (
                        <Image
                            src={playlist?.images?.[0]?.url}
                            loader={imageLoader}
                            alt={name}
                            width={500}
                            height={500}
                            quality={100}
                            className="h-44 w-44 shadow-2xl"
                        />
                    ) :
                    (
                        <PlaceholderImage classes={`h-44 w-44 shadow-2xl bg-neutral-600`} />
                    )
            }
            
            <div>
                <p className="text-xs">{playlistTitle}</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold mb-1">{ playlist?.name }</h1>
                <div>
                    <div className="text-xs flex flex-wrap space-y-0">
                        {
                            userImage ? (
                                <Image
                                    src={userImage}
                                    loader={imageLoader}
                                    alt={`${owner} Image`}
                                    width={40}
                                    height={40}
                                    quality={100}
                                    className="w-4 h-4 mr-2 mb-1 rounded-full"
                                />
                            ) : (
                                <></>
                            ) 
                        }
                        
                        <span className="hover:underline cursor-pointer">{ owner }</span>
                        <span className="mx-1">•</span>
                        <span>{ trackCount }</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlaylistHeading;