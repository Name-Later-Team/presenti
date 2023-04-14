import AppLogo from "components/app-logo";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/modules/Home.module.scss";
import { useState } from "react";
import { Notification } from "components/notification";
import FullscreenCenterContentLayout from "layouts/fullscreen-center-content";

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

    const [isSubmitting] = useState(false);

    const handleFindPresentationCode: SubmitHandler<IFormInputs> = (formValues) => {
        console.log(formValues);
        Notification.notifySuccess(formValues.presentationCode);
        reset();
    };

    return (
        <FullscreenCenterContentLayout>
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
                                        placeholder="1234 5678"
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
                                Tham gia
                            </Button>
                        </div>
                    </Stack>
                </Form>
            </Card>
        </FullscreenCenterContentLayout>
    );
}
