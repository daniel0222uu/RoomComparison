/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This disables ESLint during build time
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig