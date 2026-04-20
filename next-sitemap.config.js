/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.edriftelectric.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
}
