"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useRouteChange(callback) {
  const pathname = usePathname();

  useEffect(() => {
    if (callback && typeof callback === "function") {
      callback(pathname);
    }
  }, [pathname, callback]);
}
