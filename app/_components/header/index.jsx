"use client";
import Image from "next/image";
import SearchBox from "../search";
import NavigationBar from "../nav/headerNav";
import { FileScan } from "lucide-react";
import { FiBell, FiGift } from "react-icons/fi";
import ProfileAvatar from "../profile";
import Link from "next/link";
import { useSidebarVisibility } from "@/hooks/use-sidebar-visibility";

const Header = () => {
  const showSidebar = useSidebarVisibility();
  return (
    <>
      <div className="h-[50px] flex w-full  bg-[--header-bg] items-center z-50 py-3">
        <div className="container mx-[10px]">
          <div className="flex w-full justify-left items-center">
            <div className="w-[265px] flex items-center justify-between">
              <Image
                src="https://resource.awesomescreenshot.com/static/images/69947c5abfeb688e7ca3.png"
                width={108}
                height={29}
                alt="awesomescreenshot logo"
              />
              <div className="float-left h-[25px] w-[1px] bg-[hsla(0,0%,100%,.19)]"></div>
            </div>
            <div className="flex items-center justify-between w-full">
              <SearchBox />
              <div className="flex gap-[5px] items-center text-[--popover-text-color]">
                {!showSidebar && (
                  <Link
                    href="/my_items"
                    className="mr-5 text-[--popover-text-color]"
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
