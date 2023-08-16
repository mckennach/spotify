import { ReactElement } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import Layout from '../../components/Layout'
import LoginLayout from '../../components/LoginLayout'
import Image from "next/image";
import { imageLoader } from "@/lib/images";
import { IProvider } from "@/types/types";

interface Provider {
    callBackUrl: string,
    id: string,
    name: string,
    signinUrl: string,
    type: string
}

interface Providers {
    [key:string]: Provider
}



const Login = ({ providers }:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <div className="flex flex-col items-center  min-h-screen w-full justify-center">
            {/* <img src="https://links.papareact.com/9xl" alt="Spotify Logo" className="w-52 mb-5" /> */}
            <Image 
                loader={imageLoader}
                src="https://links.papareact.com/9xl" 
                alt="Spotify Logo" 
                className="w-52 mb-5"
                quality={100}
                width={150}
                height={150}
            />
            {
                Object.values(providers).map((provider) => {
                    const { name, id }: any = provider;
                    return (
                        <div key={name}>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn(id, {
                                        callbackUrl: '/'
                                    })
                                }}
                                className="bg-[#18D860] text-white p-5 rounded-full">
                                Login with {name}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout> 
      <LoginLayout>{page}</LoginLayout>
    </Layout>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps<{
  providers: any
}> = async () => {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    };
}