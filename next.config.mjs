/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site — `next build` emits deployable HTML to `out/` (host anywhere:
  // GitHub Pages, S3+CloudFront, Netlify…). Remove this block to deploy on a Node/
  // Vercel runtime instead.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
