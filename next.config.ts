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

  // Cleanup unneeded files & temporary setup routes & template demo sections
  const unneededFiles = [
    path.join(__dirname, 'src', 'components', 'LogoBox.tsx'),
    path.join(__dirname, 'scripts', 'copy_logos.js'),
    path.join(__dirname, 'src', 'app', 'api', 'copy-logos', 'route.ts'),
    path.join(__dirname, 'src', 'app', 'api', 'auth', 'copy-logos', 'route.ts'),
  ];
  unneededFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`[next.config] Cleaned up unused file: ${path.basename(file)}`);
    }
  });

  const unneededDirs = [
    path.join(__dirname, 'src', 'app', 'api', 'copy-logos'),
    path.join(__dirname, 'src', 'app', 'api', 'auth', 'copy-logos'),
    // Commented-out demo template sections requested for removal
    path.join(__dirname, 'src', 'app', '(admin)', 'apps'),
    path.join(__dirname, 'src', 'app', '(admin)', 'invoices'),
    path.join(__dirname, 'src', 'app', '(admin)', 'pages'),
    path.join(__dirname, 'src', 'app', '(admin)', 'ui'),
    path.join(__dirname, 'src', 'app', '(admin)', 'extended'),
    path.join(__dirname, 'src', 'app', '(admin)', 'icons'),
    path.join(__dirname, 'src', 'app', '(admin)', 'charts'),
    path.join(__dirname, 'src', 'app', '(admin)', 'forms'),
    path.join(__dirname, 'src', 'app', '(admin)', 'tables'),
    path.join(__dirname, 'src', 'app', '(admin)', 'maps'),
    path.join(__dirname, 'src', 'app', '(other)', 'auth'),
    path.join(__dirname, 'src', 'app', '(other)', 'coming-soon'),
    path.join(__dirname, 'src', 'app', '(other)', 'errors'),
    path.join(__dirname, 'src', 'app', '(other)', 'layouts'),
    path.join(__dirname, 'src', 'app', '(other)', 'maintenance'),
    path.join(__dirname, 'src', 'app', '(other)'),
  ];
  unneededDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`[next.config] Removed unused demo folder: ${path.basename(dir)}`);
    }
  });
} catch (e) {
  console.error('[next.config] Asset check/cleanup warning:', e);
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
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