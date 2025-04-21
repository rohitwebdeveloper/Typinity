/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // ✅ Allows images from all domains
          },
        ],
      },
};

export default nextConfig;
