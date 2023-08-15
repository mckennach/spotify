import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { shuffle } from 'lodash'; 
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../../atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import PlaceholderImage from "../PlaceholderImage";
import LoadingScreen from "../LoadingScreen";
const PlaylistHeading = () => {
    const { data: session, status } = useSession();
    const [ color, setColor ] = useState('');
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [ playlist, setPlaylist ] = useRecoilState(playlistState);
    const [ user, setUser ] = useState(null);
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
      setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
        .then((data) => {
            setPlaylist(data.body); 
        })
        .catch((err) => console.warn('Something went wrong', err));
    }, [spotifyApi, playlistId])

    useEffect(() => {
       if(playlistId) {
            spotifyApi.getUser(playlist?.owner?.id)
            .then((data) => {
                setUser(data.body);
            });
        }  
    
    }, [spotifyApi, playlist])



    if(!playlist) return <LoadingScreen color={color} />
    

    const playlistTitle = playlist?.public ? 'Public Playlist' : 'Private Playlist';
    const trackCount = playlist?.tracks?.total > 0 ? `${playlist?.tracks?.total} songs` : `${playlist?.tracks?.total} songs`;
   
    const owner = user ? user?.display_name : playlist?.owner?.display_name;
    const userImage = user ? user?.images?.[0].url : null;

    

    return(
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-800 px-5 py-5 ${color} h-80`}>
            {
                playlist?.images?.length > 0 ?
                    (
                        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt={playlist?.name} />
                    ) :
                    (
                        <PlaceholderImage classes={`h-44 w-44 shadow-2xl bg-neutral-600`} />
                    )
            }
            
            <div>
                <p className="text-xs">{playlistTitle}</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold mb-1">{ playlist?.name }</h1>
                <div>
                    <div className="text-xs flex">
                        {
                            userImage ? (
                                <img src={userImage} alt={`${owner} Image`} className="w-4 mr-2 rounded-full" />
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