const { env } = require('process');

module.exports = {
  async redirects() {
    return [
      {
        source: '/guides',
        destination: 'https://guides.crystopia.net',
        permanent: true,
      },
    ];
  },
  env: {
    NEXTPORXY_URL: process.env.PORXY_URL,
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
        hostname: '*',
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
