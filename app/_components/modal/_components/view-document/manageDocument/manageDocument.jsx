import React from "react";
import DocumentFolder from "./documentFolder";
import DocumentBtn from "./documentBtn";
import DocumentShareLink from "./documentShareLink";

const ManageDocument = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full p-3 bg-[--folder-bg] rounded-[5px]">
          <DocumentFolder />
        </div>
        <div className="w-full p-3 bg-[--folder-bg] rounded-[5px]">
          <DocumentBtn />
        </div>
        <div className="w-full p-3 bg-[--folder-bg] rounded-[5px]">
          <DocumentShareLink />
        </div>
      </div>
    </>
  );
};

export default ManageDocument;
