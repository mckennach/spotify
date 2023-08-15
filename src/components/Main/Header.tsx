import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { shuffle } from 'lodash'; 
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../../atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import UserHeaderMenu from "./UserHeaderMenu";
import PlaylistHeading from "../Playlist/PlaylistHeading";

const Header = () => {
    const { data: session, status } = useSession();

    return (
        <header className="">
            <UserHeaderMenu session={session} status={status} />
        </header>
    );
   
};

export default Header;