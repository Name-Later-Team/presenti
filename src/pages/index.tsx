import AppLogo from "components/app-logo";
import Head from "next/head";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/modules/Home.module.scss";
import { useState } from "react";
import { Notification } from "components/notification";
import { AlertBuilder } from "components/alert";

const schema = z.object({
    presentationCode: z.string().trim().length(8, { message: "Mã bài trình bày bao gồm 8 chữ số" }),
});

interface IFormInputs {
    presentationCode: string;
}

export default function Home() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: zodResolver(schema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFindPresentationCode: SubmitHandler<IFormInputs> = (formValues) => {
        console.log(formValues);
        Notification.notifySuccess(formValues.presentationCode);
        reset();
    };

    return (
        <>
            <Head>
                <title>Presenti - Hệ thống lấy ý kiến thời gian thực</title>
            </Head>
            <main className="h-100 container-xxl">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <Card className={styles["home__card"]}>
                        <Form onSubmit={handleSubmit(handleFindPresentationCode)}>
                            <Stack gap={1}>
                                <AppLogo className="mb-3" />

                                <Form.Group>
                                    <Form.Label>Nhập mã bài trình bày</Form.Label>
                                    <Controller
                                        control={control}
                                        name="presentationCode"
                                        defaultValue=""
                                        render={({ field: { ref, value, onChange } }) => (
                                            <Form.Control
                                                ref={ref}
                                                value={value}
                                                onChange={onChange}
                                                size="lg"
                                                isInvalid={errors?.presentationCode?.message ? true : false}
                                                disabled={isSubmitting}
                                                placeholder="VD: 12345678"
                                            />
                                        )}
                                    />

                                    <Form.Text className="text-danger">{errors?.presentationCode?.message}</Form.Text>
                                </Form.Group>

                                <div className="d-grid gap-3">
                                    <Button
                                        disabled={isSubmitting}
                                        variant="primary"
                                        className="text-uppercase mt-3"
                                        size="lg"
                                        type="submit"
                                    >
                                        Gửi
                                    </Button>
                                </div>
                            </Stack>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    );
}
