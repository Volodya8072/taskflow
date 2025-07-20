const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', 
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