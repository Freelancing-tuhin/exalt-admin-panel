import type { ReactNode } from "react";
import { Sidebar } from "../../components/main/sidebar/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-black sm:flex ">
      {/* You can add navbar/header/sidebar here if needed */}
      <div className="hidden sm:inline">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
