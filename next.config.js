const { i18n } = require('./next-i18next.config');

module.exports = {
  generateEtags: false,
  i18n,
  env: {
    SERVICE_URL: process.env.SERVICE_URL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
    }
    return config;
  },
  images: {
    domains: [
      "dev-dashboard.consultida.com", 
      "dashboard.consultida.com",
      "consultida.com",
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com'
    ]
  },
};