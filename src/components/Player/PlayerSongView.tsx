import Image from "next/image";
import { imageLoader } from "@/lib/images";
import { ITrack, IArtist } from "@/types/tracks";
import PlaceholderImage from "../PlaceholderImage";
const PlayerSongView = ({ songInfo }: { songInfo: ITrack}) => {
    const { name, artists, album, type, duration_ms: duration, id, uri }: ITrack = songInfo;
  
    const artistList = artists ? artists.map((artist: IArtist) => artist.name).join('') : '';

    return (
        <div className="flex basis-1/3">
                <div>
                    {
                    album && album?.['images'] && album['images'].length > 0 ? (
                            <Image
                                loader={imageLoader}
                                src={album?.images[0].url} 
                                alt={`${name} ${type}`} 
                                width={150}
                                height={150}
                                quality={100}
                                className="w-14 mr-3 hidden md:block" 
                            />
                        ) : (
                            <PlaceholderImage classes="w-14 mr-3 hidden md:block" />
                        ) 
                    }
                      
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-sm text-neutral-300 hover:underline cursor-pointer">{ name }</h3>
                    <p className="text-xs hover:underline cursor-pointer">{ artistList }</p>   
                </div>
            </div>
    )
}

export default PlayerSongView;