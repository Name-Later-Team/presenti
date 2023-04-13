import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import NotificationContainer from "components/notification/notification-container";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Presenti - Hệ thống lấy ý kiến thời gian thực</title>
                <meta
                    name="description"
                    content="Presenti - Hệ thống lấy ý kiến thời gian thực thuộc hệ thống ứng dụng Presento - Presenti"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Component {...pageProps} />
            <NotificationContainer />
        </>
    );
}
