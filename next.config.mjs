/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource.awesomescreenshot.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "awevideo.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
