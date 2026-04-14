/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://sentimetrics.zapier.app https://*.zapier.app;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
