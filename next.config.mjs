/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: Cloudflare Pages on this project is configured to serve
  // a static "out" directory, not run Next.js's Node server. That means no
  // server-side API routes (see app/api/*) or Image Optimization loader --
  // ContactForm/DeveloperForm fall back to mailto:, and next/image serves
  // unoptimized files instead.
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
