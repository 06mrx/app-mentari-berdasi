/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});


const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    API: process.env.API,
  },
  images: {
    domains : ["api_mentari.test", "api-mentari.death-code.site"],
  },
})

module.exports = nextConfig
