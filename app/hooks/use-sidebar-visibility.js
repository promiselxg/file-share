import { usePathname } from "next/navigation";

export const useSidebarVisibility = () => {
  const pathname = usePathname();

  // Define routes or patterns where the sidebar should not be displayed
  const noSidebarPatterns = [
    /^\/my_items$/,
    /^\/shared_with_me$/,
    /^\/trash$/,
    /^\/folder\/[A-Za-z0-9]+$/, // Matches "/folder/{id}" format
    // Add more patterns as needed
  ];

  // Check if the current route matches any of the patterns
  const showSidebar = noSidebarPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  return showSidebar;
};
