/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ["localhost", "s3.us-east-1.wasabisys.com"],
    formats: ["image/avif"],
  },
};

export default nextConfig;
