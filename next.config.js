/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/company",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
