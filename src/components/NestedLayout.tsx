import { useEffect, ReactNode } from "react";
import Sidebar from "./SideBar/Sidebar";
import Player from "./Player/Player";

import MainContainer from "./Main/MainContainer";
const NestedLayout = ({ children }: {
    children: ReactNode
}) => {

  return (
    <>
      <div className="nested-container flex h-full overflow-hidden">
        <Sidebar />
        <MainContainer>
          {children}
        </MainContainer>
      </div>
      <Player />
    </>
    
  );
};

export default NestedLayout;