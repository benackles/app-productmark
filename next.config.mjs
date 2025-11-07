/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`,
  },
  // Enable PWA support
  headers: async () => {
    const buildId = process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`;
    
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'X-Build-ID',
            value: buildId,
          },
        ],
      },
    ]
  },
  generateBuildId: async () => {
    // Use Vercel deployment ID if available, otherwise use timestamp
    return process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
