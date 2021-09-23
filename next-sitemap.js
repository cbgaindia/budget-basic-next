module.exports = {
  siteUrl: process.env.SITE_URL || 'https://schemes.openbudgetsindia.org/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
