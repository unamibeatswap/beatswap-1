/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    remotePatterns: [{ hostname: '*' }],
  },
  experimental: {
    serverComponentsExternalPackages: ['@reown/appkit'],
  },
}

module.exports = nextConfig
