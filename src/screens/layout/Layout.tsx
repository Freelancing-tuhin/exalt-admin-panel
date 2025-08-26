import type { ReactNode } from "react";
import { Sidebar } from "../../components/main/sidebar/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen  overflow-hidden bg-white text-black sm:flex ">
      {/* You can add navbar/header/sidebar here if needed */}
      <div className="hidden lg:inline">
        <Sidebar />
      </div>
      <div className="w-full h-screen overflow-y-scroll">{children}</div>
    </div>
  );
};
