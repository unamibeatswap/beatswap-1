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
    cpus: 1,
    memoryBasedWorkersCount: true,
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'react-icons', 'wagmi', 'viem']
  },
  serverExternalPackages: [
    'firebase-admin',
    '@reown/appkit',
    'wagmi',
    'viem',
    '@wagmi/core',
    '@wagmi/connectors'
  ],
  productionBrowserSourceMaps: false,

  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    // Memory optimization
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all'
          }
        }
      }
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Fix for Web3 libraries - exclude problematic packages from server bundle
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push(
        'pino-pretty', 
        'lokijs', 
        'encoding',
        '@reown/appkit',
        'wagmi',
        'viem',
        '@wagmi/core',
        '@wagmi/connectors'
      )
    }
    
    // Define globals for SSR compatibility
    config.plugins = config.plugins || []
    config.plugins.push(
      new (require('webpack')).DefinePlugin({
        'typeof self': '"undefined"',
        'typeof window': isServer ? '"undefined"' : '"object"',
      })
    )
    
    return config
  },
}

module.exports = nextConfig