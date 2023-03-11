import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import NotificationContainer from "components/notification/notification-container";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Presenti</title>
                <meta name="description" content="Presenti - Lấy ý kiến thời gian thực" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Component {...pageProps} />
            <NotificationContainer />
        </>
    );
}
