"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPLayer = ({ url, ...props }) => {
  return (
    <>
      <ReactPlayer
        url={url}
        {...props}
        controls={true}
        width="100%"
        height="100%"
      />
    </>
  );
};

export default VideoPLayer;
