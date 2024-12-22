"use client";
import React from "react";
import SharedFolder from "./_component/sharedFolder";
import SharedImageVideo from "./_component/sharedImageVideo";

const folders = [
  {
    id: "eb316d4fc5a53dc86db286b78aa75903",
    name: "Folder 1",
    folderid: "F02VREe0O2",
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "Promise",
    },
  },
];

const imageVideo = [
  {
    id: "eb316d4fc5a53dc86db286b78aa75904",
    title: "AwesomeScreenshot-12/21/2024,9:18:25PM",
    folderid: "F02VREe0O2",
    view: 0,
    mediaInfo: {
      mediaType: "image",
      mediaUrl:
        "https://awesomescreenshot.s3.amazonaws.com/image/5993044/52167833-b8179e1203d2da092d5ea268b7227f0b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241221%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241221T221452Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=2f58e59973851634b46de265fa980fb358c8cb1cd016ad42c6772c9791a0d59a",
    },
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "Promise",
    },
    createdAt: "Dec 21, 2024",
  },
  {
    id: "eb316d4fc5a53dc86db286b78aa75903",
    title: "another image.png",
    folderid: "F02VREe0O2",
    view: 2,
    mediaInfo: {
      mediaType: "video",
      mediaDuration: "00:01",
      mediaUrl:
        "https://awevideo.s3.amazonaws.com/video-34886990-278f50a6d748c8b9fef192e597b2b982_480x270.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241221%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241221T202135Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=2938ee7e562888b64701a4733fc333d9176cd2e0c926000f82333ee4133f0cbd",
    },
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "Promise",
    },
    createdAt: "Dec 21, 2024",
  },
  {
    id: "eb316d4fcqq115a53dc86db286b78aa75903",
    title: "map-34.png",
    folderid: "F02VREe0O2",
    view: 2,
    mediaInfo: {
      mediaType: "video",
      mediaDuration: "00:01",
      mediaUrl:
        "https://awevideo.s3.amazonaws.com/video-20660451-062988d3917c276b4ffed4f35c16b0dd_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T053037Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=2ba9b5886bb0e0f759c7408218740066fe931d05676a45f1ec718e22baecaf6d",
    },
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "Anuforo",
    },
    createdAt: "Dec 21, 2024",
  },
  {
    id: "eb316d4fc5a53dsssc86db286b78aa75903",
    title: "map-13.png",
    folderid: "F02VREe0O2",
    view: 2,
    mediaInfo: {
      mediaType: "image",
      mediaUrl:
        "https://awevideo.s3.amazonaws.com/video-19844464-fa3c35cd3dc7e46dace12bf447110ce5_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T053130Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=0bf56a79148acb972d6aefd3af9365bd6fa24e5bdb921a100392eb492c24a8ed",
    },
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "Deede",
    },
    createdAt: "Dec 21, 2024",
  },
];
const SharedWithMe = () => {
  return (
    <>
      <div className="w-full flex relative flex-col">
        <div className="flex flex-col w-full mb-20 relative">
          <div className="flex flex-col">
            <div className="container">
              <div className="flex justify-between w-full items-center container pt-5  px-3">
                <h1 className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[24px]">
                  Shared with me
                </h1>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="container">
                <div className="flex w-full p-3 flex-col gap-y-2">
                  <p className="text-[14px] text-[--gray] leading-[14px]">
                    Folders
                  </p>
                  <div className="grid w-full grid-cols-4 gap-5 relative">
                    <SharedFolder data={folders} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full p-3 flex-col gap-y-2">
              <p className="text-[14px] text-[--gray] leading-[14px]">
                Images &amp; Videos
              </p>
              <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                <SharedImageVideo data={imageVideo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedWithMe;
