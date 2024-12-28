"use client";

import { usePathname } from "next/navigation";
import SideBar from "./_components/sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Define routes or patterns where the sidebar should not be displayed
  const noSidebarPatterns = [
    /^\/my_items$/,
    /^\/shared_with_me$/,
    /^\/trash$/,
    /^\/folder\/[A-Za-z0-9]+$/, // Matches "/folder/{id}" format
    // /^\/folder\/[A-Za-z0-9]+\/[A-Za-z0-9]+$/, // Matches "/shared/{id}/{token}"
  ];

  // Check if the current route matches any of the patterns
  const showSidebar = noSidebarPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  return (
    <div className="flex w-full gap-4">
      {showSidebar && <SideBar />}
      <div className="h-screen relative overflow-y-scroll w-full">
        {children}
      </div>
    </div>
  );
}
