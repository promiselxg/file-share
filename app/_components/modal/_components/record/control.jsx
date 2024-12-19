import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useScreenRecord } from "@/context/screenRecord.context";

const ControlWrapper = ({ Icon, heading, type, media }) => {
  const { toggleCamera, toggleSound, handleToggleCamera, handleToggleSound } =
    useScreenRecord();
  return (
    <>
      <div className="w-full flex items-center justify-between bg-[--switch-bg] py-2 px-3 rounded-[8px] my-1 flex-col">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-1 text-[12px]">
            {Icon && Icon}
            {heading && type === "text" && (
              <>
                <span className="text-[--primary-btn]  text-[10px] leading-[1.1] border-r-[1px] border-[--divider-border-color]">
                  {heading}
                </span>
                <span className="text-[--primary-btn]">0/20</span>
              </>
            )}
            {heading && type !== "text" && <span>{heading}</span>}
          </div>
          <div>
            {type === "switch" && (
              <Switch
                className="data-[state=checked]:bg-[--primary-btn] data-[state=unchecked]:bg-[#6f6f6f]"
                onClick={() =>
                  media === "camera"
                    ? handleToggleCamera()
                    : media === "sound"
                    ? handleToggleSound()
                    : null
                }
              />
            )}
            {type === "resolution" && (
              <Select>
                <SelectTrigger className="max-w-[100px] text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                  <SelectValue placeholder="Re" />
                </SelectTrigger>
                <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color]">
                  <SelectItem value="hd">HD 720p</SelectItem>
                  <SelectItem value="fhd">
                    FHD 1080p <Badge>PRO</Badge>
                  </SelectItem>
                  <SelectItem value="4k">4k</SelectItem>
                </SelectContent>
              </Select>
            )}
            {type === "counter" && (
              <div className="flex items-center gap-1 text-[12px]">
                <Input
                  type="number"
                  name=""
                  id=""
                  min={3}
                  max={10}
                  className="border border-[--folder-border-color] flex w-[50px] px-2 py-2 h-4 bg-[--body-bg]"
                />
                s
              </div>
            )}
          </div>
        </div>
        {media === "sound" && toggleSound && (
          <div className="w-full flex">
            <Select className="w-full">
              <SelectTrigger className="w-full text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                <SelectValue placeholder="Re" />
              </SelectTrigger>
              <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color]">
                <SelectItem value="hd">HD 720p</SelectItem>
                <SelectItem value="fhd">
                  FHD 1080p <Badge>PRO</Badge>
                </SelectItem>
                <SelectItem value="4k">4k</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {media === "camera" && toggleCamera && (
          <div className="w-full flex">
            <Select className="w-full">
              <SelectTrigger className="w-full text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                <SelectValue placeholder="Re" />
              </SelectTrigger>
              <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color]">
                <SelectItem value="hd">HD 720p</SelectItem>
                <SelectItem value="fhd">
                  FHD 1080p <Badge>PRO</Badge>
                </SelectItem>
                <SelectItem value="4k">4k</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlWrapper;
