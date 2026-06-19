/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 💡 এই ডাবল স্টারচিহ্ন যেকোনো ডোমেইনকে অ্যালাউ করবে
      },
    ],
  },
};

export default nextConfig;