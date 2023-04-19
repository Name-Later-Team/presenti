import { zodResolver } from "@hookform/resolvers/zod";
import { getOrSetUserAnonymousIdentifier } from "backend/common/libs";
import AppLogo from "components/app-logo";
import { Notification } from "components/notification";
import FullscreenCenterContentLayout from "layouts/fullscreen-center-content";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import AudienceService from "services/audience-service";
import { z } from "zod";
import { ERROR_NOTIFICATION, RESPONSE_CODE } from "../constants";
import styles from "../styles/modules/Home.module.scss";

const schema = z.object({
    votingCode: z
        .string()
        .trim()
        .regex(/\d{4} \d{4}/, { message: "Mã bài trình bày phải bao gồm 8 chữ số" }),
});

interface IFormInputs {
    votingCode: string;
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
    const router = useRouter();

    const [isSubmitting] = useState(false);

    const handleFindVotingCode: SubmitHandler<IFormInputs> = async (formValues) => {
        const votingCode = formValues.votingCode.replaceAll(" ", "");
        try {
            const res = await AudienceService.getPresentationFromVotingCodeAsync(votingCode);

            if (res.code === 200) {
                const resData = res.data;
                if (!resData) {
                    Notification.notifyError(ERROR_NOTIFICATION.JOIN_VOTING_PROCESS);
                    return;
                }
                router.push(`/${resData?.identifier}`);
            }
        } catch (error: any) {
            const res = error?.response?.data;

            if (res.code === RESPONSE_CODE.CANNOT_JOIN_NOT_PRESENTING_PRESENTATION) {
                Notification.notifyError(ERROR_NOTIFICATION.NOT_PRESENTING_PRESENTATION);
                return;
            }

            if (res.code === RESPONSE_CODE.CANNOT_FIND_PRESENTATION) {
                Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_PRESENTATION);
                return;
            }

            if (res.code === RESPONSE_CODE.VALIDATION_ERROR) {
                Notification.notifyError(ERROR_NOTIFICATION.VALIDATION_ERROR);
                return;
            }

            console.error("Home:", error);
            Notification.notifyError(ERROR_NOTIFICATION.JOIN_VOTING_PROCESS);
        }
        reset();
    };

    return (
        <FullscreenCenterContentLayout>
            <Card className={styles["home__card"]}>
                <Form onSubmit={handleSubmit(handleFindVotingCode)}>
                    <Stack gap={1}>
                        <AppLogo className="mb-3" />

                        <Form.Group>
                            <Form.Label htmlFor="form-voting-code">Nhập mã bài trình bày</Form.Label>
                            <Controller
                                control={control}
                                name="votingCode"
                                defaultValue=""
                                render={({ field: { ref, value, onChange } }) => (
                                    <InputMask
                                        mask="9999 9999"
                                        maskPlaceholder=""
                                        value={value}
                                        onChange={onChange}
                                        disabled={isSubmitting}
                                    >
                                        <Form.Control
                                            ref={ref}
                                            placeholder="1234 5678"
                                            size="lg"
                                            id="form-voting-code"
                                            isInvalid={errors?.votingCode?.message ? true : false}
                                        />
                                    </InputMask>
                                )}
                            />

                            <Form.Text className="text-danger">{errors?.votingCode?.message}</Form.Text>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    // init user id if not exist
    getOrSetUserAnonymousIdentifier(context.req, context.res);

    return {
        props: {},
    };
};
