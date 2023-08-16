import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageLoader } from "next/image";
import { imageLoader } from "@/lib/images";
import PlaceholderImage from "../PlaceholderImage";
import { millisToMinutesAndSeconds } from "@/lib/time";
import { IImage, IImageArray, IArtist, ITrack } from "@/types/types";

const SearchTopResult = ({ searchData }: { searchData: any }) => {
    const [ topArtist, setTopArtist ] = useState(false);
    const [ topSongs, setTopSongs ] = useState([]);
    const searchItems = searchData ? searchData?.artists.items : false;
    useEffect(() => {
        if(searchData) {
            setTopArtist(searchData?.artists.items?.[0]);
            setTopSongs(searchData?.tracks?.items);
        }
        
    }, [searchData]);

    

    if(!topArtist) return (
        <div className="basis-1/2">
            <h1 className="text-1xl md:text-2xl xl:text-3xl font-bold mb-5 animate-pulse">Top Results</h1>
            <div className=" shadow rounded-md p-6  w-full hover:bg-neutral-700  transition-all ease-in-out duration-600 cursor-pointer">
                <div className="animate-pulse flex flex-col space-y-4">
                    <div className="rounded-full bg-slate-700 h-32 w-32"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <h2 className="text-xl font-bold bg-slate-700 h-[24px] rounded"></h2>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 h-[15px] rounded col-span-2">
                                    <p className="capitalize"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // const artistImages: any = topArtist ? topArtist['images'] : [];
    // const artistName: String = topArtist ? topArtist['name'] : '';
    const { images, name, type }: any = topArtist;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full ml-0">
            <div className="h-full md:basis-1/2">
                <h1 className="text-1xl md:text-2xl xl:text-3xl font-bold mb-5">Top Artist</h1>
                <div className="rounded-md p-6  w-full hover:bg-neutral-600  transition-all ease-in-out h-auto duration-600 cursor-pointer">
                    <div className="flex flex-col space-y-4">
                        <div className="rounded-full overflow-hidden h-32 w-32">
                            { images.length > 0 ? (
                                <Image 
                                    src={images?.[0].url}
                                    loader={imageLoader}
                                    alt={name}
                                    width={images[0].width}
                                    height={images[0].height}
                                    quality={100}
                                />
                            ) : (
                                <PlaceholderImage classes={`h-full w-full bg-neutral-500 `}/>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <h2 className="text-2xl font-bold">{ name }</h2>
                            <div className="space-y-3">
                                <p className="capitalize">{ type }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full md:basis-1/2">
                <h1 className="text-1xl md:text-2xl xl:text-3xl font-bold mb-5">Top Songs</h1>
                <div className="rounded-md px-4 py-6 w-full   transition-all ease-in-out duration-600 cursor-pointer h-auto">
                    <ul className="list-none ">
                        {
                            topSongs.length > 0 ? (
                                topSongs.map((song: ITrack) => {
                                    const { name, artists, duration_ms: duration, id }: any = song;
                                    const artistList = artists ? artists.map((artist: IArtist) => artist.name).join(',') : '';
                                    const url: any = song?.album?.images?.[0]['url'];
                                    // const name: any = song?.name;
                                    return (
                                        <li key={id} className="flex justify-between items-center hover:bg-neutral-600 p-[0.29rem] ">
                                            <div className="flex space-x-4">
                                                <Image 
                                                    src={url}
                                                    loader={imageLoader}
                                                    alt={name}
                                                    width={150}
                                                    height={150}
                                                    quality={100}
                                                    className="w-11 h-11"
                                                />
                                                <div>
                                                    <p className="text-sm text-white">{name}</p>
                                                    <p className="text-xs text-neutral-500">{ artistList }</p>
                                                </div>
                                                
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 mr-1">{ millisToMinutesAndSeconds(duration) }</p>
                                            </div> 
                                        </li>
                                    )
                                })
                            ) : (
                                <li>No Songs</li>
                            )
                        }
                    </ul>
                   
                </div>
            </div>
        </div>
        
    )
}

export default SearchTopResult;