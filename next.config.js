/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // For static export
  },
  // Ensure proper chunking for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for large libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;

