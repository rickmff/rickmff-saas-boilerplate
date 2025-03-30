/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server actions
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // Add your production domains here
      ],
    },
  },
  // Optimize images
  images: {
    domains: [
      'img.clerk.com', // For Clerk user images
      // Add other image domains you might use
    ],
  },
};

export default nextConfig;