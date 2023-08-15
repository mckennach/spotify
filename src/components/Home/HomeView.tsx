import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistsState } from "../../../atoms/playlistAtom";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { viewState } from "../../../atoms/viewAtom";
import PlaylistCard from "./PlaylistCard";
import { isPlayingState } from "../../../atoms/songAtom";

const HomeView = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const playlists = useRecoilValue(playlistsState);
    const [ greeting, setGreeting ] = useState('Good Morning') 
    const today = new Date()
    const curHr = today.getHours()

    useEffect(() => {
        if (curHr < 12) {
            setGreeting('Good Morning');
        } else if (curHr < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, [session, greeting])
    
    

    return (
        <div className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-800 from-rose-950 px-5 py-10 `}>
            <div className="w-full">
                <h1 className="text-1xl md:text-3xl xl:text-4xl font-bold mb-5">{ greeting }</h1>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {playlists.slice(0, 6).map((playlist) => {
                        const { id } = playlist;
                        return (
                            <PlaylistCard key={id} playlist={playlist} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default HomeView;