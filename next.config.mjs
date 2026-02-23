/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // set what you need: '5mb', '20mb', '100mb', etc.
    },
  },
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
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "jibuntu.org",
      }
    ],
  },
};

export default nextConfig;
