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
        source: '/portfolio/auction-portal',
        destination: '/pl/portfolio/nanobid',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/pl/calculate-estimate',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/pl/about',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/pl/services',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/pl/portfolio',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/pl/contact',
        permanent: true,
      },
      {
        source: '/calculate-estimate',
        destination: '/pl/calculate-estimate',
        permanent: true,
      },
      {
        source: '/portfolio/english-tutor',
        destination: '/pl/portfolio/kurs8klasisty',
        permanent: true,
      },
      {
        source: '/portfolio/commercial-project',
        destination: '/pl/portfolio',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
