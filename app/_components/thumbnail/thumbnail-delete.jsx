import Image from "next/image";
import React from "react";

const ImageVideoDelete = ({ img, time }) => {
  return (
    <>
      <div className="w-full overflow-hidden h-[200px] rounded-[8px] border border-[--folder-border-color] relative imgThubnail  cursor-pointer">
        <Image
          src={
            img ??
            "https://awevideo.s3.amazonaws.com/video-24223306-7d6baf003965db122db057d26116cf61_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T044836Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=feb3094abb0ff6e7e04102d7186a2fd4d104c4c432cb8ae2b1fec14204a2438a"
          }
          width={500}
          height={200}
          alt="video thumbnail"
          className="w-full object-cover h-[200px]"
        />
        {time && (
          <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
            {time}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageVideoDelete;
