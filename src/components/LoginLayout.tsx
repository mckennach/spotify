import { ReactNode } from "react";

const LoginLayout = ({ children }: {
    children: ReactNode
}) => {

  return (
    <div className="nested-container flex">
      {children}
    </div>
  );
};

export default LoginLayout;