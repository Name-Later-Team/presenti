import FullscreenCenterContentLayout from "layouts/fullscreen-center-content";
import { Alert, Card, Stack } from "react-bootstrap";
import styles from "../styles/modules/VotingPage.module.scss";
import { useRouter } from "next/router";
import ContentSlide, { IContentSlideProps, ISlideChoice } from "components/voting-slides/content-slides";
import { useEffect, useState } from "react";
import { Loading } from "components/loading";
import NotFoundSlide from "components/voting-slides/not-found-slide";
import ForbiddenSlide from "components/voting-slides/forbidden-slide";
import StartSlide from "components/voting-slides/start-slide";
import AwaitSlide from "components/voting-slides/await-slide";
import ThankYouSlide from "components/voting-slides/thank-you-slide";
import { PresentationPaceStateType, SlideType } from "shared/types";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getOrSetUserAnonymousIdentifier } from "backend/common/libs";
import { Notification } from "components/notification";
import { ERROR_NOTIFICATION, INFO_NOTIFICATION, RESPONSE_CODE } from "../constants";
import AudienceService from "services/audience-service";
import { IMultipleChoiceExtraConfigs, IPresentationDetailResponse } from "shared/interfaces";
import LoadingSlide from "components/voting-slides/loading-slide";

export enum PageMode {
    start,
    await,
    slide,
    end,
    not_found,
    forbidden,
    loading,
}

interface IVotingPresentPace {
    mode: string;
    active: string;
    state: PresentationPaceStateType;
    counter: number;
}

const defaultSlideDetail: IContentSlideProps["slide"] = {
    id: -1,
    question: "",
    questionDescription: "",
    questionImageUrl: null,
    questionVideoEmbedUrl: null,
    extrasConfig: "",
    isActive: false,
    presentationIdentifier: "",
    slideType: "",
    speakerNotes: "",
    hideInstructionBar: true,
    choices: [],
    position: -1,
    textSize: 32,
};

const defaultPresentationState: IPresentationDetailResponse = {
    name: "",
    closedForVoting: false,
    identifier: "",
    ownerDisplayName: "",
    pace: {
        active_slide_id: -1,
        counter: 0,
        mode: "",
        state: "",
    },
    totalSlides: 0,
};

export default function VotingPage(props: { identifier: string }) {
    const { identifier } = props;

    // libs
    const router = useRouter();

    // get params
    const presentationIdentifier = Array.isArray(router.query.presentationIdentifier)
        ? router.query.presentationIdentifier[0]
        : router.query.presentationIdentifier;

    // states
    const [pageMode, setPageMode] = useState<PageMode>(PageMode.loading);
    const [presentation, setPresentation] = useState<IPresentationDetailResponse>(
        defaultPresentationState as IPresentationDetailResponse
    );
    const [currentSlide, setCurrentSlide] = useState<IContentSlideProps["slide"]>(
        defaultSlideDetail as IContentSlideProps["slide"]
    );
    const [isLoading] = useState(false);
    const [isSubmiting] = useState(false);

    useEffect(() => {
        if (!presentationIdentifier) {
            return;
        }

        const fetchPresentationDetail = async () => {
            try {
                const res = await AudienceService.getPresentationDetailAsync(presentationIdentifier);

                if (res.code === 200) {
                    if (!res.data) {
                        Notification.notifyError(ERROR_NOTIFICATION.FETCH_PRESENTATION_DETAIL);
                        return;
                    }
                    setPresentation(res.data);
                    return;
                }

                throw new Error("Unhandled code");
            } catch (error: any) {
                const res = error?.response?.data;

                if (res.code === RESPONSE_CODE.CANNOT_FIND_PRESENTATION) {
                    Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_PRESENTATION);
                    return;
                }

                if (res.code === RESPONSE_CODE.CANNOT_JOIN_NOT_PRESENTING_PRESENTATION) {
                    setPageMode(PageMode.start);
                    return;
                }

                console.error("VotingPage:", error);
                Notification.notifyError(ERROR_NOTIFICATION.FETCH_PRESENTATION_DETAIL);
            }
        };

        fetchPresentationDetail();
    }, [presentationIdentifier]);

    // fetch new slide information
    useEffect(() => {
        if (!presentation.pace.active_slide_id || presentation.pace.active_slide_id === -1 || !presentationIdentifier) {
            return;
        }

        const fetchCurrentSlide = async (slideId: string) => {
            try {
                const res = await AudienceService.getSlideDetailAsync(presentationIdentifier, slideId);

                if (res.code === 200) {
                    if (!res.data) {
                        Notification.notifyError(ERROR_NOTIFICATION.FETCH_PRESENTATION_DETAIL);
                        setPageMode(PageMode.not_found);
                        return;
                    }
                    setCurrentSlide(res.data);
                    setPageMode(PageMode.slide);
                    return;
                }

                throw new Error("Unhandled code");
            } catch (error: any) {
                const res = error?.response?.data;

                if (res.code === RESPONSE_CODE.CANNOT_FIND_PRESENTATION) {
                    Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_PRESENTATION);
                    setPageMode(PageMode.not_found);
                    return;
                }

                if (res.code === RESPONSE_CODE.CANNOT_JOIN_NOT_PRESENTING_PRESENTATION) {
                    setPageMode(PageMode.start);
                    return;
                }

                console.error("VotingPage:", error);
                Notification.notifyError(ERROR_NOTIFICATION.FETCH_PRESENTATION_DETAIL);
                setPageMode(PageMode.not_found);
            }
        };

        fetchCurrentSlide(presentation.pace.active_slide_id.toString());
    }, [presentation.pace.active_slide_id, presentationIdentifier]);

    const handleSubmitSlideChoice = async (choices: ISlideChoice[]) => {
        if (!presentationIdentifier) return;

        // prepare payload
        const choiceIds = choices.map((choice) => choice.id);

        // submit
        try {
            await AudienceService.postVotingOptions(
                presentationIdentifier,
                presentation.pace.active_slide_id.toString(),
                {
                    userId: identifier,
                    choiceIds: choiceIds,
                }
            );

            setPageMode(PageMode.await);
        } catch (error: any) {
            const res = error?.response?.data;

            if (res.code === RESPONSE_CODE.CANNOT_FIND_PRESENTATION) {
                Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_PRESENTATION);
                return;
            }

            if (res.code === RESPONSE_CODE.CANNOT_FIND_SLIDE) {
                Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_SLIDE);
                return;
            }

            if (res.code === RESPONSE_CODE.CLOSED_VOTING) {
                Notification.notifyError(ERROR_NOTIFICATION.CLOSED_VOTING);
                setPresentation((prev) => ({ ...prev, closedForVoting: true }));
                return;
            }

            if (res.code === RESPONSE_CODE.MULTIPLE_ANSWER_DISABLED) {
                Notification.notifyError(ERROR_NOTIFICATION.MULTIPLE_ANSWER_DISABLED);
                setCurrentSlide((prev) => {
                    const config = { enableMultipleAnswers: false } as IMultipleChoiceExtraConfigs;
                    return {
                        ...prev,
                        extrasConfig: JSON.stringify(config),
                    };
                });
                return;
            }

            if (res.code === RESPONSE_CODE.SLIDE_VOTING_DISABLED) {
                Notification.notifyError(ERROR_NOTIFICATION.SLIDE_VOTING_DISABLED);
                return;
            }

            if (res.code === RESPONSE_CODE.DISABLED_VOTE_SAME_SESSION) {
                Notification.notifyInfo(INFO_NOTIFICATION.DISABLED_VOTE_SAME_SESSION);
                setPageMode(PageMode.await);
                return;
            }

            console.error("VotingPage:", error);
            Notification.notifyError(ERROR_NOTIFICATION.VOTE_PROCESS);
        }
    };

    /**
     * Render an appropriate slide based on current information
     * @returns React.ReactNode
     */
    const renderSlide = (): React.ReactNode => {
        if (isLoading) return <Loading animationType="grow" message="Đang tải dữ liệu" color="primary" />;

        switch (pageMode) {
            case PageMode.not_found: {
                return <NotFoundSlide />;
            }

            case PageMode.forbidden: {
                return <ForbiddenSlide />;
            }

            case PageMode.start: {
                return <StartSlide />;
            }

            case PageMode.await: {
                return <AwaitSlide />;
            }

            case PageMode.loading: {
                return <LoadingSlide />;
            }

            case PageMode.slide: {
                return (
                    <>
                        <ContentSlide
                            disabled={isSubmiting || presentation?.closedForVoting}
                            slide={currentSlide}
                            onSubmitChoice={handleSubmitSlideChoice}
                        />
                        {presentation?.closedForVoting && (
                            <Alert variant="danger" className="mt-3">
                                <p className="fs-5 fw-bolder mb-1">Đã đóng bầu chọn</p>
                                <p className="mb-0">
                                    Vui lòng đợi người trình bày mở quyền bầu chọn cho bài trình chiếu này.
                                </p>
                            </Alert>
                        )}
                    </>
                );
            }

            case PageMode.end: {
                return <ThankYouSlide />;
            }

            default: {
                return null;
            }
        }
    };

    return (
        <FullscreenCenterContentLayout>
            <Card className={styles["voting-page__card"]}>
                <Stack>
                    <Link href="/" target={"_blank"} title="Trang chủ">
                        <div className={styles["voting-page__card__app-logo-container"]}>
                            <Image
                                className={styles["voting-page__card__app-logo-container__logo"]}
                                src="/images/logo-presenti-transparent.png"
                                alt="app-logo"
                                priority
                                fill
                            />
                        </div>
                    </Link>

                    {renderSlide()}
                </Stack>
            </Card>
        </FullscreenCenterContentLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // init user id if not exist
    const identifier = getOrSetUserAnonymousIdentifier(context.req, context.res);

    return {
        props: {
            identifier,
        },
    };
};
