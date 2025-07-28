/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogbackend.afuwapetunde.com",
      },
    ],
  },
};

export default nextConfig;
