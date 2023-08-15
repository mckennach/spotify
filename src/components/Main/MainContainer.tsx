import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Songs from "../Playlist/PlaylistSongs";
import { useRecoilValue } from "recoil";
import { viewState } from "../../../atoms/viewAtom";

import HomeView from "../Home/HomeView";
import PlaylistView from "../Playlist/PlaylistView";
import SearchView from "../Search/SearchView";

const MainContainer = ({ children }: { children: ReactNode}) => {

    const activeView = useRecoilValue(viewState);

    const View = () => {
        switch (activeView) {
            case 'home':
                return <HomeView />
                break;
            case 'search':
                return <SearchView />
                break;
            default:
                return <PlaylistView />
                break;
        }
    }

    return (
        <div className="h-screen flex flex-grow flex-col overflow-hidden bg-neutral-800 pb-24">
                <div className="rounded-lg overflow-y-auto h-full">
                    <Header />
                    <View />
                </div> 
        </div> 
    )
}

export default MainContainer;