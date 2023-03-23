import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Stack } from "react-bootstrap";
import styles from "../styles/modules/403.module.scss";

export default function PageNotFound() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Presenti - Truy cập bị cấm</title>
            </Head>
            <div className={styles["forbidden__forbidden-content"]}>
                <Stack className={styles["forbidden-content__stack"]} gap={3}>
                    <h2>Truy cập bị cấm</h2>
                    <p className="mx-3">Bạn không được phép truy cập trang này.</p>
                    <Button className="mb-3" variant="primary" onClick={() => router.replace("/")}>
                        Về trang chủ
                    </Button>
                    <div>
                        <img
                            src="svgs/undraw_warning.svg"
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
