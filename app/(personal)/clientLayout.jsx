"use client";

import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import Header from "./_components/header";
import { useEffect, useState } from "react";
import SideBar from "./_components/sidebar";
import { useSidebarVisibility } from "../hooks/use-sidebar-visibility";

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const showSidebar = useSidebarVisibility();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <ClerkLoaded>
          <div className="w-full flex">
            <Header />
          </div>
          <div className="flex w-full gap-4">
            {showSidebar && <SideBar />}
            <div className="h-screen relative overflow-y-scroll w-full">
              {children}
            </div>
          </div>
        </ClerkLoaded>
      ) : (
        <ClerkLoading>
          <div className="w-full flex items-center h-screen text-white justify-center flex-col">
            <Loader2 className="animate-spin" size={50} />
            <p className="text-sm mt-2">please wait...</p>
          </div>
        </ClerkLoading>
      )}
    </>
  );
}
