import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  // PWA plugin adds webpack config; Next 16 dev uses Turbopack by default.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default withPWA(nextConfig);
