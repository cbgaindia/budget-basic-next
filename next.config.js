module.exports = {
  poweredByHeader: false,
};

module.exports = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
        source: '/(.*)',
      },
    ];
  },
};

module.exports = {
  async redirects() {
    return [
      {
        destination: '/:chapter',
        permanent: true,
        source: '/:chapter.html',
      },
      {
        destination: '/introduction_to_budget',
        permanent: true,
        source: '/intro.html',
      },
    ];
  },
};

module.exports = {
  images: {
    domains: [process.env.NEXT_PUBLIC_STRAPI_API_URL],
  },
};

module.exports = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
        locale: false,
        source: '/:all*(svg|jpg|png)',
      },
    ];
  },
};

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
