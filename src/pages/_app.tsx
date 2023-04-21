import NotificationContainer from "components/notification/notification-container";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
    // suppress useLayoutEffect (and its warnings) when not running in a browser
    if (typeof window === "undefined") React.useLayoutEffect = () => {};

    return (
        <>
            <Head>
                <title>Presenti - Hệ thống lấy ý kiến thời gian thực</title>
                <meta name="title" content="Presenti - Hệ thống lấy ý kiến thời gian thực" />
                <meta
                    name="description"
                    content="Presenti - Hệ thống lấy ý kiến thời gian thực thuộc hệ thống ứng dụng Presento - Presenti"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://metatags.io/" />
                <meta property="og:title" content="Presenti - Hệ thống lấy ý kiến thời gian thực" />
                <meta
                    property="og:description"
                    content="Presenti - Hệ thống lấy ý kiến thời gian thực thuộc hệ thống ứng dụng Presento - Presenti"
                />
                <meta property="og:image" content="https://i.ibb.co/VJNqddd/logo-presenti-transparent.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta property="twitter:title" content="Presenti - Hệ thống lấy ý kiến thời gian thực" />
                <meta
                    property="twitter:description"
                    content="Presenti - Hệ thống lấy ý kiến thời gian thực thuộc hệ thống ứng dụng Presento - Presenti"
                />
                <meta property="twitter:image" content="https://i.ibb.co/VJNqddd/logo-presenti-transparent.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Component {...pageProps} />
            <NotificationContainer />
        </>
    );
}
