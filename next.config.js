/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Ignores ESLint errors and warnings during the build process
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "punycode": false,
            };
        }
        return config;
    },
};

export default nextConfig;
