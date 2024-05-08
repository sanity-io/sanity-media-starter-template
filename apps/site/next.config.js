/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}],
  },
  experimental: {
    taint: true,
  },
  transpilePackages: ['@media-starter/charts'],
  async headers() {
    return [
      {
        // Allow generating Open Graph images when running Sanity Studio locally
        source: '/api/og',
        headers: [{key: 'Access-Control-Allow-Origin', value: '*'}],
      },
    ]
  },
}

module.exports = nextConfig
