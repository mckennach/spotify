const PlayerSongView = ({ songInfo }: { songInfo: any}) => {
    const { name, artists, album, type, duration_ms: duration, id, uri } = songInfo;
    const { images, name: albumName } = album;
    const artistList = artists.map(artist => artist.name).join('');
    return (
        <div className="flex basis-1/3">
                <div>
                    <img src={images[0].url} alt={`${name} ${type}`} className="w-14 mr-3 hidden md:block" />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-sm text-neutral-300 hover:underline cursor-pointer">{ name }</h3>
                    <p className="text-xs hover:underline cursor-pointer">{ artistList }</p>   
                </div>
            </div>
    )
}

export default PlayerSongView;