import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Ensure missing logo files exist for webpack resolution
try {
  const imgDir = path.join(__dirname, 'src', 'assets', 'images');
  const srcLogo = path.join(imgDir, 'logo2.png');
  if (fs.existsSync(srcLogo)) {
    ['logo.png', 'logo-dark.png', 'logo-sm.png', 'logo-light.png'].forEach((target) => {
      const dest = path.join(imgDir, target);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(srcLogo, dest);
        console.log(`[next.config] Created missing logo asset: ${target}`);
      }
    });
  }
} catch (e) {
  console.error('[next.config] Failed copying logo files:', e);
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false,
        net: false,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;