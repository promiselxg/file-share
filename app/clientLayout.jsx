"use client";

import SideBar from "./_components/sidebar";
import { useSidebarVisibility } from "@/hooks/use-sidebar-visibility";

export default function ClientLayout({ children }) {
  const showSidebar = useSidebarVisibility();

  return (
    <div className="flex w-full gap-4">
      {showSidebar && <SideBar />}
      <div className="h-screen relative overflow-y-scroll w-full">
        {children}
      </div>
    </div>
  );
}
