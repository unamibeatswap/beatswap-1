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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Fix for Web3 libraries
    config.externals = config.externals || []
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    // Define global for SSR
    config.plugins = config.plugins || []
    config.plugins.push(
      new (require('webpack')).DefinePlugin({
        'global.self': 'globalThis',
      })
    )
    
    return config
  },
}

module.exports = nextConfig