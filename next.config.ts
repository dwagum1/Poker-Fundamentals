import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/starting-hands/learn/advanced",
        destination: "/starting-hands/learn",
        permanent: true,
      },
      {
        source: "/starting-hands/quiz-advanced",
        destination: "/starting-hands/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
