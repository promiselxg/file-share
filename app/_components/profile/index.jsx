import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RiVipCrown2Line } from "react-icons/ri";

import { IoImageOutline } from "react-icons/io5";
import { MdVideoCameraBack } from "react-icons/md";
import Link from "next/link";

const ProfileAvatar = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer">
            <AvatarImage
              src="https://github.com/promiselxg.png"
              alt="promiselxg"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="bg-[--dialog-bg] shadow-md border-none DialogBoxShadow text-[--sidebar-link-color]">
          <div className="w-full flex p-2 flex-col">
            <div className="flex gap-3 items-center w-full py-2">
              <Avatar className="w-[40px] h-[40px] overflow-hidden cursor-pointer">
                <AvatarImage
                  src="https://github.com/promiselxg.png"
                  alt="promiselxg"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-[600] text-sm">Promiselxg</h1>
                  <Badge className="bg-[--switch-bg] text-[10px] px-2 rounded-[10px] text-white">
                    Free
                  </Badge>
                </div>
                <p className="text-[12px] text-[#6e6e6e]">
                  okeydeede@gmail.com
                </p>
              </div>
            </div>
            <Separator className="mt-5 bg-[--divider-color]" />
            <div className="w-full flex flex-col">
              <div className="flex mt-4 gap-3 items-center">
                <div className="flex-1 pt-2">
                  <div className="border-2 w-[30px] h-[30px] rounded-full flex items-center justify-center border-[#434343]">
                    <IoImageOutline
                      size={17}
                      className="text-[--primary-btn]"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[--sidebar-link-color]">
                      Images
                    </span>
                    <span className="text-sm text-[--gray]">1/100</span>
                  </div>
                  <Progress value={1} className="w-full bg-[--gray] h-[5px]" />
                </div>
              </div>
              <div className="flex mt-2 gap-3 items-center">
                <div className="flex-1 pt-2">
                  <div className="border-2 w-[30px] h-[30px] rounded-full flex items-center justify-center border-[#434343]">
                    <MdVideoCameraBack
                      size={17}
                      className="text-[--primary-btn]"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[--sidebar-link-color]">
                      Videos
                    </span>
                    <span className="text-sm text-[--gray]">8/20</span>
                  </div>
                  <Progress value={40} className="w-full bg-[--gray] h-[5px]" />
                </div>
              </div>
              <div className="w-full my-3">
                <Button className="w-full bg-[--primary-btn] hover:bg-[--primary-btn-hover] h-[32px] rounded-[8px] flex items-center gap-2">
                  <RiVipCrown2Line size={20} /> Upgrade
                </Button>
              </div>
            </div>
            <Separator className="mt-5 bg-[--divider-color]" />
            <div className="w-full flex mt-2">
              <ul className="flex flex-col w-full text-[--sidebar-link-color]">
                <li className="flex w-full hover:bg-[--folder-bg]  rounded-[8px] link-transition p-2">
                  <Link href="/">Settings</Link>
                </li>
                <li className="flex w-full hover:bg-[--folder-bg]  rounded-[8px] link-transition p-2">
                  <Link
                    href="/"
                    className="flex justify-between items-center w-full"
                  >
                    Appearance
                    <Badge className="border border-[green] text-[green] bg-transparent text-[12px] font-[400] rounded-[8px]">
                      New
                    </Badge>
                  </Link>
                </li>
                <li className="flex w-full hover:bg-[--folder-bg]  rounded-[8px] link-transition p-2">
                  <Link href="/">Help center</Link>
                </li>
                <li className="flex w-full hover:bg-[--folder-bg]  rounded-[8px] link-transition p-2 -mb-2">
                  <Link href="/">Blog</Link>
                </li>
              </ul>
            </div>
            <Separator className="mt-5 bg-[--divider-color]" />
            <div className="w-full flex mt-2 -mb-2">
              <li className="flex w-full hover:bg-[--folder-bg]  rounded-[8px] link-transition p-2">
                <Link href="/">Log out</Link>
              </li>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProfileAvatar;
