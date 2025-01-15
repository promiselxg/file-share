import React from "react";

const EmptyCard = () => {
  return (
    <>
      <div className="w-[98%] flex h-[350px] bg-[--dialog-bg] rounded-[8px]">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-[--gray] text-[40px]">This folder is Empty</h1>
        </div>
      </div>
    </>
  );
};

export default EmptyCard;
