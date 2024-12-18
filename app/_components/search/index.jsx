import { BiSearchAlt2 } from "react-icons/bi";
import React from "react";

const SearchBox = () => {
  return (
    <>
      <div className="w-[45%] mx-[20px]">
        <div className="flex items-center gap-2">
          <BiSearchAlt2 className="text-[rgba(255,255,255,0.3)]" />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="bg-transparent outline-none w-full text-[rgba(255,255,255,0.7)] text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
