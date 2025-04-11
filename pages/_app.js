import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <DefaultSeo
                title="KI-Portfolio von Viktor Baal"
                description="Data Analyst Portfolio mit KI-Fokus"
                openGraph={{
                    type: 'website',
                    locale: 'de_DE',
                    url: 'https://ki-portfolio.vercel.app/',
                    site_name: 'KI-Portfolio Viktor Baal',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp; 