import { usePathname, useSearchParams } from "next/navigation";

export const useGetURLInfo = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParam = (key) => searchParams.get(key);

  // Example: Extracting the last segment as ID
  const getID = () => {
    const segments = pathname.split("/").filter(Boolean); // Remove empty strings
    return segments.pop();
  };

  return {
    pathname,
    getQueryParam,
    getID,
  };
};
