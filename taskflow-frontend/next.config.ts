const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: false,
      },
    ]
  },
}

export default nextConfig;
