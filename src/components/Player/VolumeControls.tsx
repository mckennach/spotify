import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

const VolumeControls = ({ volume, setVolume }: { volume: any, setVolume: any }) => {

    
    
    return (
        <div className="basis-1/3 flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <SpeakerWaveIcon onClick={() => setVolume(0)} className="button hover:text-white cursor-pointer"/>
            <input 
                className="w-14 md:w-24 w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-200" 
                type="range" 
                onChange={e => setVolume(Number(e.target.value))} 
                value={parseInt(volume)} 
                min={0} 
                max={100} />
        </div>
    )
}

export default VolumeControls;


