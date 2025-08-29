/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "jibuco.com",
      },
      {
        protocol: "https",
        hostname: "committed-paradise-9b1cb948f5.media.strapiapp.com",
      }
    ],
  },
};

export default nextConfig;
