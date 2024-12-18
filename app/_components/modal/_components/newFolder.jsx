import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const NewFolder = () => {
  return (
    <>
      <Input
        placeholder="Enter a folder name"
        className="border border-[#434343] boxShadow focus-visible:outline-none focus-visible:border-[--primary-btn] text-[--sidebar-link-color] font-[600] text-[14px] rounded-[8px] mt-3"
      />
      <div className="w-full flex justify-end gap-3">
        <Button
          variant="outline"
          className="bg-transparent border-[#434343] hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn"
        >
          Cancel
        </Button>
        <Button className="bg-[--primary-btn] hover:bg-[--primary-btn] cursor-not-allowed">
          Create
        </Button>
      </div>
    </>
  );
};

export default NewFolder;
