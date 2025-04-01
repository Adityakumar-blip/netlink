import { ReactNode, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initialize theme based on saved preference
    const savedTheme = localStorage.getItem("snip-admin-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-scroll">
        {" "}
        <Navbar />
        {children}
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default Layout;
