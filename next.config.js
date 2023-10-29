/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/gh/samsaadhanii/scl/dhaatupaatha/graphs/**",
      },
    ],
  },
};
