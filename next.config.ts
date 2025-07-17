import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "titancode.pl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.titancode.pl",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/en/portfolio',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/calculate-estimate',
        destination: '/en/calculate-estimate',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
