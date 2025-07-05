/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  serverExternalPackages: ['pino-pretty', 'lokijs', 'encoding'],
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Memory optimization
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      },
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    config.plugins = config.plugins || []
    config.plugins.push(
      new (require('webpack')).DefinePlugin({
        'global.self': 'globalThis',
        'global': 'globalThis',
        'self': 'globalThis'
      })
    )
    
    return config
  },
}

module.exports = nextConfig