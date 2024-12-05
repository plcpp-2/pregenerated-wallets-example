/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["ipfs.io", "349727a4ec341e84982e34ffb54950c3.ipfscdn.io"],
  },
};

export default nextConfig;
