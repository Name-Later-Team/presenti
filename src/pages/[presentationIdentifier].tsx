import FullscreenCenterContentLayout from "layouts/fullscreen-center-content";
import { Alert, Card, Stack } from "react-bootstrap";
import styles from "../styles/modules/VotingPage.module.scss";
import { useRouter } from "next/router";
import ContentSlide, { IContentSlideProps, ISlideChoice } from "components/voting-slides/content-slides";
import { useCallback, useEffect, useRef, useState } from "react";
import NotFoundSlide from "components/voting-slides/not-found-slide";
import ForbiddenSlide from "components/voting-slides/forbidden-slide";
import StartSlide from "components/voting-slides/start-slide";
import AwaitSlide from "components/voting-slides/await-slide";
import ThankYouSlide from "components/voting-slides/thank-you-slide";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getOrSetUserAnonymousIdentifier } from "backend/common/libs";
import { Notification } from "components/notification";
import {
    ERROR_NOTIFICATION,
    RESPONSE_CODE,
    SOCKET_EMIT_EVENT,
    SOCKET_LISTEN_EVENT,
    SOCKET_NAMESPACE,
} from "../constants";
import AudienceService from "services/audience-service";
import {
    IChangeSlideSocketMsg,
    IMultipleChoiceExtraConfigs,
    IPresentActionSocketMsg,
    IPresentationDetailResponse,
    IQuitSlideSocketMsg,
} from "shared/interfaces";
import LoadingSlide from "components/voting-slides/loading-slide";
import useSocket, { SOCKET_STATUS } from "hooks/use-socket";

export enum PageMode {
    start,
    await,
    slide,
    end,
    not_found,
    forbidden,
    loading,
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
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [voted, setVoted] = useState(false);

    // refs
    // keep track of having slide detail
    const gotSlideDetail = useRef(false);
    // keep track of joined socket room
    const joinedRoom = useRef(false);

    // custom hooks
    const { socket, status, methods } = useSocket(identifier);

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
                        setPageMode(PageMode.not_found);
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

        fetchPresentationDetail();
    }, [presentationIdentifier]);

    // fetch new slide information
    useEffect(() => {
        if (!presentation.pace.active_slide_id || presentation.pace.active_slide_id === -1 || !presentationIdentifier) {
            return;
        }

        const fetchCurrentSlide = async (slideId: string) => {
            setPageMode(PageMode.loading);
            setVoted(false);
            try {
                const res = await AudienceService.getSlideDetailAsync(presentationIdentifier, slideId);

                if (res.code === 200) {
                    if (!res.data) {
                        Notification.notifyError(ERROR_NOTIFICATION.FETCH_PRESENTATION_DETAIL);
                        setPageMode(PageMode.not_found);
                        return;
                    }
                    setCurrentSlide(res.data);
                    setVoted(false);
                    setPageMode(PageMode.slide);
                    gotSlideDetail.current = true;
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

        gotSlideDetail.current = false;
        fetchCurrentSlide(presentation.pace.active_slide_id.toString());
    }, [presentation.pace.active_slide_id, presentationIdentifier]);

    // ================= handle socket section =================
    const handleChangeSlideFromSocket = useCallback(
        (data: IChangeSlideSocketMsg) => {
            if (!presentationIdentifier) return;
            if (data?.presentationIdentifier !== presentationIdentifier) return;

            if (data?.pace?.active_slide_id?.toString() === presentation.pace.active_slide_id.toString()) return;

            setPresentation((prev) => ({
                ...prev,
                pace: {
                    active_slide_id: data?.pace?.active_slide_id ?? prev.pace.active_slide_id,
                    counter: data?.pace?.counter ?? prev.pace.counter,
                    mode: data?.pace?.mode ?? prev.pace.mode,
                    state: data?.pace?.state ?? prev.pace.state,
                },
            }));
        },
        [presentationIdentifier, presentation.pace.active_slide_id]
    );

    const handleQuitSlideFromSocket = useCallback(
        (data: IQuitSlideSocketMsg) => {
            if (!presentationIdentifier) return;
            if (data?.presentationIdentifier !== presentationIdentifier) return;

            setPresentation(defaultPresentationState);
            setPageMode(PageMode.end);
        },
        [presentationIdentifier]
    );

    const handlePresentActionFromSocket = useCallback(
        (data: IPresentActionSocketMsg) => {
            if (!presentationIdentifier) return;
            if (data?.presentationIdentifier !== presentationIdentifier) return;

            if (data?.pace?.active_slide_id?.toString() === presentation.pace.active_slide_id.toString()) return;

            setPresentation((prev) => ({
                ...prev,
                pace: {
                    active_slide_id: data?.pace?.active_slide_id ?? prev.pace.active_slide_id,
                    counter: data?.pace?.counter ?? prev.pace.counter,
                    mode: data?.pace?.mode ?? prev.pace.mode,
                    state: data?.pace?.state ?? prev.pace.state,
                },
            }));
        },
        [presentationIdentifier, presentation.pace.active_slide_id]
    );

    // handle events
    useEffect(() => {
        if (!socket) return;

        // reset all event listeners
        socket.removeAllListeners(SOCKET_LISTEN_EVENT.change_slide);
        socket.removeAllListeners(SOCKET_LISTEN_EVENT.quit_slide);
        socket.removeAllListeners(SOCKET_LISTEN_EVENT.present);

        // init all event listeners
        socket.on(SOCKET_LISTEN_EVENT.change_slide, (data: IChangeSlideSocketMsg) => handleChangeSlideFromSocket(data));
        socket.on(SOCKET_LISTEN_EVENT.quit_slide, (data: IQuitSlideSocketMsg) => handleQuitSlideFromSocket(data));
        socket.on(SOCKET_LISTEN_EVENT.present, (data: IPresentActionSocketMsg) => handlePresentActionFromSocket(data));
    }, [socket, handleChangeSlideFromSocket, handleQuitSlideFromSocket, handlePresentActionFromSocket]);

    useEffect(() => {
        // init a new websocket when have gotten all the slide detail and the socket is not initialized
        if (status === SOCKET_STATUS.notInitialized) {
            methods.initSocket(SOCKET_NAMESPACE.presentation);
        }

        // join room only 1 time when socket was connected
        if (!joinedRoom.current && presentationIdentifier && socket && status === SOCKET_STATUS.isConnected) {
            socket.emit(SOCKET_EMIT_EVENT.join_room, presentationIdentifier);
            joinedRoom.current = true;
        }
    });
    // ================= end of handling socket section =================

    const handleSubmitSlideChoice = async (choices: ISlideChoice[]) => {
        if (!presentationIdentifier) return;

        // prepare payload
        const choiceIds = choices.map((choice) => choice.id);

        // submit
        try {
            setIsSubmiting(true);
            await AudienceService.postVotingOptions(
                presentationIdentifier,
                presentation.pace.active_slide_id.toString(),
                {
                    userId: identifier,
                    choiceIds: choiceIds,
                }
            );

            setIsSubmiting(false);
            setPageMode(PageMode.await);
        } catch (error: any) {
            const res = error?.response?.data;

            if (res.code === RESPONSE_CODE.CANNOT_FIND_PRESENTATION) {
                Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_PRESENTATION);
                setIsSubmiting(false);
                return;
            }

            if (res.code === RESPONSE_CODE.CANNOT_FIND_SLIDE) {
                Notification.notifyError(ERROR_NOTIFICATION.CANNOT_FIND_SLIDE);
                setIsSubmiting(false);
                return;
            }

            if (res.code === RESPONSE_CODE.CLOSED_VOTING) {
                Notification.notifyError(ERROR_NOTIFICATION.CLOSED_VOTING);
                setIsSubmiting(false);
                setPresentation((prev) => ({ ...prev, closedForVoting: true }));
                return;
            }

            if (res.code === RESPONSE_CODE.MULTIPLE_ANSWER_DISABLED) {
                Notification.notifyError(ERROR_NOTIFICATION.MULTIPLE_ANSWER_DISABLED);
                setIsSubmiting(false);
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
                setIsSubmiting(false);
                return;
            }

            if (res.code === RESPONSE_CODE.DISABLED_VOTE_SAME_SESSION) {
                setIsSubmiting(false);
                setVoted(true);
                return;
            }

            console.error("VotingPage:", error);
            Notification.notifyError(ERROR_NOTIFICATION.VOTE_PROCESS);
            setIsSubmiting(false);
        }
    };

    /**
     * Render an appropriate slide based on current information
     * @returns React.ReactNode
     */
    const renderSlide = (): React.ReactNode => {
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
                            disabled={isSubmiting || presentation?.closedForVoting || !currentSlide.isActive}
                            slide={currentSlide}
                            onSubmitChoice={handleSubmitSlideChoice}
                            alreadyVoted={voted}
                            skipSlide={() => setPageMode(PageMode.await)}
                        />
                        {(!currentSlide.isActive || presentation?.closedForVoting) && (
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
