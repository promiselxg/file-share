import React from "react";

export const StarIcon = ({ ...className }) => {
  return (
    <>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 30 30"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        focusable="false"
        {...className}
      >
        <rect
          x="9"
          y="4.5"
          width="18"
          height="12"
          rx="3"
          fill="#FFAF53"
          fillOpacity="0.5"
        ></rect>
        <path
          d="M1.5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C3.78 3 4.62 3 6.3 3h5.724c1.08 0 1.62 0 2.097.165a3 3 0 0 1 1.122.696c.36.354.6.837 1.08 1.805L18.177 9.4H23.7c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311c.327.642.327 1.482.327 3.162v8c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C26.22 27 25.38 27 23.7 27H6.3c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C1.5 24.72 1.5 23.88 1.5 22.2V7.8Z"
          fill="url(#StarredFolderGradient_svg__a)"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.194 12.544a.868.868 0 0 1 1.612 0l.814 1.901a.127.127 0 0 0 .101.077l1.988.218c.76.084 1.066 1.064.498 1.596l-1.485 1.393a.135.135 0 0 0-.039.124l.415 2.036c.159.777-.642 1.383-1.303.986l-1.732-1.04a.122.122 0 0 0-.126 0l-1.731 1.04c-.662.397-1.463-.209-1.304-.986l.415-2.036a.135.135 0 0 0-.04-.124l-1.484-1.393c-.567-.532-.261-1.512.498-1.596l1.988-.218a.127.127 0 0 0 .101-.077l.814-1.9Z"
          fill="#fff"
          fillOpacity="0.8"
        ></path>
        <defs>
          <linearGradient
            id="StarredFolderGradient_svg__a"
            x1="15"
            y1="3"
            x2="15"
            y2="27"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFAF52"></stop>
            <stop offset="1" stopColor="#FF8A71"></stop>
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export const Icon = ({ ...className }) => {
  return (
    <>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 120 120"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        focusable="false"
        {...className}
      >
        <rect
          x="36"
          y="18"
          width="72"
          height="48"
          rx="12"
          fill="#FFAF53"
          fillOpacity="0.5"
        ></rect>
        <path
          d="M6 31.2c0-6.72 0-10.08 1.308-12.648a12 12 0 0 1 5.244-5.244C15.12 12 18.48 12 25.2 12h22.895c4.32 0 6.481 0 8.387.66a12.001 12.001 0 0 1 4.491 2.784c1.438 1.414 2.399 3.35 4.32 7.22L72.706 37.6H94.8c6.721 0 10.081 0 12.648 1.308a11.997 11.997 0 0 1 5.244 5.244C114 46.72 114 50.08 114 56.8v32c0 6.72 0 10.08-1.308 12.648a11.994 11.994 0 0 1-5.244 5.244C104.881 108 101.521 108 94.8 108H25.2c-6.72 0-10.08 0-12.648-1.308a11.997 11.997 0 0 1-5.244-5.244C6 98.881 6 95.521 6 88.8V31.2Z"
          fill="url(#FolderGradient_svg__a)"
        ></path>
        <defs>
          <linearGradient
            id="FolderGradient_svg__a"
            x1="60"
            y1="12"
            x2="60"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFAF52"></stop>
            <stop offset="1" stopColor="#FF8A71"></stop>
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
