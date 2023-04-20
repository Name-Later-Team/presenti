import Head from "next/head";
import { IBaseComponent } from "shared/interfaces";

interface IFullscreenCenterContentLayoutProps extends IBaseComponent {
    pageTitle?: string;
}

export default function FullscreenCenterContentLayout(props: IFullscreenCenterContentLayoutProps) {
    const { pageTitle, children } = props;
    return (
        <>
            {pageTitle && pageTitle !== "" && (
                <Head>
                    <title>{pageTitle}</title>
                </Head>
            )}
            <main className="h-100 container-xxl">
                <div className="d-flex justify-content-center align-items-center h-100">{children}</div>
            </main>
        </>
    );
}
