import { Button } from "@/components/ui/button";
import React from "react";

const DocumentFolder = () => {
  return (
    <>
      <p className="text-sm">
        Move from <span className="font-bold">&quot;My items&quot;</span> to
      </p>
      <div className="w-full flex gap-2 justify-between items-center my-2">
        <Button className="w-1/2 bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-[8px]">
          Folder
        </Button>
        <span>or</span>
        <Button className="w-1/2 bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-[8px]">
          Workspace
        </Button>
      </div>
    </>
  );
};

export default DocumentFolder;
