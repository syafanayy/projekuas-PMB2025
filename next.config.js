/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    // Tambahan jika error saat export
    forceDynamic: true,
  },
}

module.exports = nextConfig;