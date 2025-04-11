const { withAnalyzer } = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Optimierungen für Vercel
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
        legacyBrowsers: false,
        browsersListForSwc: true,
        gzipSize: true
    },

    // Image Optimization
    images: {
        domains: ['github.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60
    },

    // Internationalisierung
    i18n: {
        locales: ['de'],
        defaultLocale: 'de'
    },

    // Headers für Sicherheit und Performance
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    }
                ]
            }
        ];
    },

    // Redirects für SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true
            }
        ];
    },

    // Webpack Konfiguration
    webpack: (config, { dev, isServer }) => {
        // Optimierungen nur für Production
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                'react': 'preact/compat',
                'react-dom': 'preact/compat'
            });
        }

        return config;
    }
};

module.exports = withAnalyzer(nextConfig); 