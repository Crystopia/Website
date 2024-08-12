module.exports = {
  async redirects() {
    return [
      {
        source: '/guides',
        destination: 'https://guides.crystopia.net',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'visage.surgeplay.com',
      },
      {
        protocol: 'https',
        hostname: 'icons.getbootstrap.com',
      },
    ],
  },
};
