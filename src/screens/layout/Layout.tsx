import type { ReactNode } from "react";
import { Sidebar } from "../../components/main/sidebar/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-black sm:flex ">
      <div className="hidden sm:inline">
        <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll h-screen">{children}</div>
    </div>
  );
};
