import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const SideBarNav = ({ Icon, label, active, btn }) => {
  return (
    <>
      <ul className="flex">
        <li className="w-full flex mb-1">
          <Link href="" className="flex w-full">
            <div
              className={cn(
                `flex items-center gap-4 w-full justify-start h-10 rounded-md px-3 text-[whitesmoke] ${
                  btn &&
                  "cursor-pointer hover:bg-[--folder-bg] transition-all delay-75 ease-in"
                } ${
                  active &&
                  "bg-[--btn-active] hover:bg-[--btn-active] text-[#1e52bf] font-[600] "
                } `
              )}
            >
              {Icon && Icon}
              {label && <span className="text-[14px]">{label}</span>}
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export const LinkWithIcon = ({ Icon, name, color, className }) => {
  return (
    <>
      <div className={cn(`flex text-[--gray] w-full ${color}`, className)}>
        <Link
          href="/shared_with_me"
          className={cn(
            `flex items-center gap-2 w-full rounded-[8px] p-2 link-transition border-none outline-none`,
            className
          )}
        >
          <span>{Icon}</span>
          <span className="text-sm">{name}</span>
        </Link>
      </div>
    </>
  );
};
