module.exports = {
  siteUrl: process.env.SITE_URL || 'https://budgetbasics.openbudgetsindia.org/',
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
