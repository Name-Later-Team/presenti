import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Stack } from "react-bootstrap";
import styles from "../styles/modules/404.module.scss";

export default function PageNotFound() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Presenti - Không tìm thấy trang</title>
            </Head>
            <div className={styles["page-not-found__page-not-found-content"]}>
                <Stack className={styles["page-not-found-content__stack"]} gap={3}>
                    <h2>Không tìm thấy trang</h2>
                    <p className="mx-3">Xin lỗi! 😖 Không thể tìm thấy liên kết này.</p>
                    <Button className="mb-3" variant="primary" onClick={() => router.replace("/")}>
                        Về trang chủ
                    </Button>
                    <div>
                        <img
                            src="svgs/undraw_page_not_found.svg"
                            style={{ width: "500px" }}
                            alt="page-not-found-illustration"
                            className="img-fluid"
                        ></img>
                    </div>
                </Stack>
            </div>
        </>
    );
}
