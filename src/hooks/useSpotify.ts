import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "@/lib/spotify";

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
// });



const useSpotify = () => {
    const { data: session } = useSession();

    useEffect(() => {
      if(session) {
        const { error }: any = session;
        if(error == 'RefreshAccessTokenError') {
            signIn();
        }
        if(session?.user) {
          const { accessToken }: any = session?.user;
          spotifyApi.setAccessToken(accessToken);
        }
      }
    }, [session])
    

    return spotifyApi;
}

export default useSpotify;