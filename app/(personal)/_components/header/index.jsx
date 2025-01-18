"use client";
import Image from "next/image";
import SearchBox from "../search";
import NavigationBar from "../nav/headerNav";
import { FileScan } from "lucide-react";
import { FiBell, FiGift, FiMenu } from "react-icons/fi";
import ProfileAvatar from "../profile";
import Link from "next/link";
import { useSidebarVisibility } from "@/hooks/use-sidebar-visibility";

const Header = () => {
  const showSidebar = useSidebarVisibility();
  return (
    <>
      <div className="h-[80px] md:h-[50px] flex w-full  bg-[--header-bg] items-center z-50 py-3">
        <div className="md:container mx-[20px] md:mx-[10px] w-full">
          <div className="flex w-full md:justify-start items-center justify-between">
            <div className="flex items-center gap-4">
              <FiMenu className="text-white" size={30} />
              <Link href="/my_item">
                <div className="md:w-[227px] flex items-center justify-start md:justify-between h-[30px] overflow-hidden">
                  <h1 className="text-[rgba(255,255,255,0.7)] ">
                    My Screenshot
                  </h1>
                  <div className="float-left h-[25px] w-[1px] bg-[hsla(0,0%,100%,.19)] hidden md:flex"></div>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-between md:w-full">
              <SearchBox />
              <div className="flex gap-[5px] items-center text-[--popover-text-color]">
                {!showSidebar && (
                  <Link
                    href="/my_items"
                    className="mr-5 text-[--popover-text-color] hidden md:flex"
                  >
                    My Items
                  </Link>
                )}
                <NavigationBar label="Pricing" url="/pricing" />
                <NavigationBar url="/pricing" Icon={<FileScan />} />
                <NavigationBar url="/pricing" Icon={<FiBell />} />
                <NavigationBar url="/pricing" Icon={<FiGift />} color />
                <ProfileAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
