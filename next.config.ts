import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export — built to `out/` and served by nginx in the Docker image.
  // Security headers, caching and gzip are handled by nginx.conf.
  output: 'export',
  poweredByHeader: false,
}

export default nextConfig
