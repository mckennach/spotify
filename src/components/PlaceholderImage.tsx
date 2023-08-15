import { MusicalNoteIcon } from "@heroicons/react/24/outline";

const PlaceholderImage = ({ classes }: { classes: any }) => {
    return (
        <div className={`${classes} flex items-center justify-center`}>
            <MusicalNoteIcon className="w-1/2" />
        </div>
    );
    
}

export default PlaceholderImage;