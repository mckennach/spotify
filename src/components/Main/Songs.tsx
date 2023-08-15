import { useState } from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../../atoms/playlistAtom";
import { ClockIcon } from "@heroicons/react/24/outline";
import Song from './Song';
const Songs = () => {
    const playlist = useRecoilValue(playlistState);
    
    return (
         <div className="text-sm text-neutral-400">
            <div className="px-5 py-5 bg-neutral-800">
                <div className="flex flex-col space-y-1 ">
                    <div className="grid grid-cols-2 p-2 ">
                        <div className="flex items-center space-x-4">
                            <p>#</p>
                            <div className="flex flex-col items-start">
                                <p className="text-sm">Artist</p>
                                <p className="text-sm "></p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between ml-auto md:ml-0">
                            <p className="text-sm truncate hidden md:inline">Album</p>
                            <p><ClockIcon className="w-5"/></p>
                        </div>
                    </div>
                </div>
               
                <hr className="border-t-[0.1px] border-neutral-500"/>
                <div className="flex flex-col space-y-1 pb-10">
                    {playlist?.tracks?.items.map((item, i) => {   
                        const previousIndex = i + 1;
                        const nextIndex = i - 1;
                        const prevSong = i > 0 ? playlist?.tracks?.items?.[previousIndex]?.track : false;
                        const nextSong = i - 1 !== playlist?.tracks?.items.length ? playlist?.tracks?.items?.[nextIndex]?.track : false;
                        return <Song nextSong={prevSong}  previousSong={nextSong} key={item.track.id} track={item.track} order={i} />
                    })}
                </div>

            </div>
        </div>
    )
   


}

export default Songs;