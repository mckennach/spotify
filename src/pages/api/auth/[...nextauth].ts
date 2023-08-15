import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "@/lib/spotify";
import type { JWT } from "next-auth/jwt";
import type { User, Account } from "next-auth";
import type { Session } from "next-auth";
import spotifyApi from "@/lib/spotify";


const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    // spotifyApi.refreshAccessToken
    console.log(`REFRESH TOKEN IS ${refreshedToken}`);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch(error) {
    console.warn(error);
    return {
      ...token,
      error: 'RefreshAccessToken'
    }
  }
}

export const authOptions: any = {
  providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            authorization: LOGIN_URL
        }),
    ],
    secret: process.env.JWT_SECRET!,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }: { token: any, account: any, user: any }) {
            if(account && user) {

                const expiresAt = account.expires_at ?? 3600;
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: expiresAt * 1000
                }
            }

            if(Date.now() < token.accessTokenExpires) {
                console.log('EXISTING TOKEN IS VALID');
                return token;
            }

            console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
            return await refreshAccessToken(token);
            
        },
        async session({ session, token }: { session: any, token: any, user: any }) {
        // Send properties to the client, like an access_token and user id from a provider.
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    },
    debug: true
}


export default NextAuth(authOptions);