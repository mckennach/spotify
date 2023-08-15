import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Songs from "./Songs";

const MainContainer = ({ children }: { children: ReactNode}) => {
    return (
        <div className="h-screen flex flex-grow flex-col overflow-hidden bg-neutral-800">
                <div className="rounded-lg overflow-y-auto">
                    <Header />
                    <Songs />
                    {/* {children} */}
                </div> 
        </div> 
    )
}

export default MainContainer;