import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-recently-played",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-follow-read",
].join(',');

const params = {
    scope: scopes
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com:443/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&${queryParamString}&state=some-state-of-my-choice`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
})

export default spotifyApi;

export { LOGIN_URL };