/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ← أضف السطر ده
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
