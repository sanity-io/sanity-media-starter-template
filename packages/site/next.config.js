/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}],
  },
  experimental: {
    taint: true,
  },
}

module.exports = nextConfig
