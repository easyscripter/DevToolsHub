import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { ROUTES } from "./constants/routes";

const withNextIntl = createNextIntlPlugin('./config/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: ROUTES.WORKSPACES,
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
