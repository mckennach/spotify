import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import NestedLayout from '@/components/NestedLayout';
// import { getServerSession } from 'next-auth';
import { useSession } from "next-auth/react"
// import { authOptions } from '../api/auth/[...nextauth]';
import spotifyApi from '@/lib/spotify';
import { useRouter } from 'next/router';

const Playlist: NextPageWithLayout = (props) => { 
  const router = useRouter();
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState(false);
  const [tracks, setTracks] = useState([]);
  const { id } = router.query;

  useEffect(() => {
      if(spotifyApi.getAccessToken()) {
        spotifyApi.getPlaylist(id).then((data) => {
           setPlaylist(data.body);
           spotifyApi.getPlaylistTracks(data.body.id).then((data) => {
            setTracks(data.body.items);
           });
        });
      }

  }, [id])
  

  
  return (
    <Layout> 
      <NestedLayout>
        <div className="z-40">
          <div className="px-10 py-10  bg-neutral-900">
            <div className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-800">
              <div className="basis-10">
                  <p>#</p>
                </div>
                <div className="basis-1/12">
                  <p>Title</p>
                </div>
                <div className="flex flex-col basis-3/12"></div>
                <div className="flex flex-col basis-2/12">
                    <p className="text-base">Album</p>
                  </div>
            </div>
            <hr className="border-t-[0.1px] border-neutral-500"/>
            <ul className="list-none space-y-2 font-small">
              {tracks.map((item, i) => {
                const { name, artists, album, type } = item.track;
                const { images, name: albumName } = album;
                const artistList = artists.map(artist => artist.name).join('');
                return (
                  <li className="flex  w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group hover:bg-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800 cursor-pointer" key={name}>
                      <div className="basis-10 flex items-center ">
                        <p>{ i }</p>
                      </div>
                      <div className="basis-1/12">
                        <img src={images[0].url} alt={`${name} ${type}`} className="w-10 h-10" />   
                      </div>
                      <div className="flex flex-col basis-3/12">
                        <h3 className="text-base">{ name }</h3>
                        <h4 className="text-sm text-neutral-600">{ artistList }</h4>
                      </div>
                      <div className="flex flex-col basis-2/12">
                        <div className="max-w-xs">
                          <p className="text-base truncate">{ albumName }</p>
                        </div>
                      </div>
                      {/* <div className="flex flex-col basis-2/12">
                        <p className="text-base truncate">{ albumName }</p>
                      </div> */}
                  </li>
                )
              })}
            </ul>
            
          </div>
        </div>
        
      </NestedLayout>
    </Layout>
  )
}



 


// export const getServerSideProps = async (context: any) => {
//   const session = await getServerSession(context.req, context.res, authOptions);
  
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

  

//   const { id } = router.query

//   const playlist = spotifyApi.getPlaylist(id)

//   return {
//     props: {
//       session,
//       playlist
//     }
//   }
// }




export default Playlist