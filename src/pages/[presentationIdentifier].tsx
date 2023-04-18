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

export enum PageMode {
    start,
    await,
    slide,
    end,
    not_found,
    forbidden,
}

interface IVotingPresentPace {
    mode: string;
    active: string;
    state: PresentationPaceStateType;
    counter: number;
}

interface IVotingPresentDetail {
    name: string;
    vote_key: string;
    pace: IVotingPresentPace;
    closed_for_voting: boolean;
    slide_count: number;
    slides: Array<{
        id: number;
        admin_key: string;
        type: SlideType;
    }>;
}

const fakeSlideData: IContentSlideProps["slide"] = {
    adminKey: "string",
    question: "Câu hỏi mẫu",
    questionDescription: "Đây là thông tin câu hỏi mẫu",
    questionImageUrl: undefined,
    questionVideoUrl: undefined,
    type: "multiple_choice",
    active: true,
    hideInstructionBar: true,
    choices: [
        {
            id: 0,
            label: "Lựa chọn 1",
            position: 0,
        },
        {
            id: 1,
            label: "Lựa chọn 2",
            position: 1,
        },
        {
            id: 2,
            label: "Lựa chọn 3",
            position: 2,
        },
    ],
    config: undefined,
    position: 0,
    textSize: 32,
};

export default function VotingPage() {
    // libs
    const router = useRouter();

    // get params
    const presentationIdentifier = Array.isArray(router.query.presentationIdentifier)
        ? router.query.presentationIdentifier[0]
        : router.query.presentationIdentifier;

    // states
    const [pageMode] = useState<PageMode>(PageMode.start);
    const [presentation] = useState<IVotingPresentDetail>({} as IVotingPresentDetail);
    const [currentSlide] = useState<IContentSlideProps["slide"]>(fakeSlideData as IContentSlideProps["slide"]);
    const [isLoading] = useState(false);
    const [isSubmiting] = useState(false);
    const [activeSlideId] = useState("");

    useEffect(() => {
        if (!presentationIdentifier) {
            return;
        }

        const fetchPresentationDetail = async () => {
            console.log("fetch presentation detail");
        };

        fetchPresentationDetail();
    }, [presentationIdentifier]);

    // fetch new slide information
    useEffect(() => {
        if (!activeSlideId || !presentationIdentifier) {
            return;
        }

        const fetchCurrentSlide = async (slideId: string) => {
            console.log(slideId);
        };

        fetchCurrentSlide(activeSlideId);
    }, [activeSlideId, presentationIdentifier]);

    const handleSubmitSlideChoice = async (choice: ISlideChoice) => {
        console.log(choice);
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

            case PageMode.slide: {
                return (
                    <>
                        <ContentSlide
                            disabled={isSubmiting || presentation?.closed_for_voting}
                            slide={currentSlide}
                            onSubmitChoice={handleSubmitSlideChoice}
                        />
                        {presentation?.closed_for_voting && (
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
                                loading="lazy"
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
