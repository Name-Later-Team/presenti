import { IBaseComponent, IMultipleChoiceExtraConfigs, ISlideDetailResponse, TExtraConfigs } from "shared/interfaces";
import { SlideWrapper } from "../slide-wrapper";
import { SlideType } from "shared/types";
import MultipleChoiceForm from "components/voting-slides/slide-forms/multiple-choice-form";
import { Stack } from "react-bootstrap";

export interface ISlideChoice {
    id: number;
    label: string;
    position: number;
}

export interface IContentSlideProps extends IBaseComponent {
    slide: ISlideDetailResponse;
    onSubmitChoice?: (choices: ISlideChoice[]) => void;
    disabled: boolean;
}

export default function ContentSlide(props: IContentSlideProps) {
    const { slide, onSubmitChoice, disabled } = props;

    const handleSubmitForm = (value: number[]) => {
        if (!Array.isArray(value)) return;
        const choicesToSubmit: ISlideChoice[] = [];
        value.forEach((item) => {
            const choice = slide.choices.find((c) => c.id === item);
            if (choice) choicesToSubmit.push(choice);
        });
        if (choicesToSubmit.length === 0 || !onSubmitChoice) {
            return;
        }

        onSubmitChoice(choicesToSubmit);
    };

    const formChoice = slide.choices
        .sort((left, right) => left.position - right.position)
        .map((choice) => ({ value: choice.id, label: choice.label }));

    /**
     * Render an appropriate form based on current slide type
     * @returns React.ReactNode
     */
    const renderForm = (): React.ReactNode => {
        switch (slide.slideType) {
            case "multiple_choice": {
                let slideConfig: TExtraConfigs = {};
                try {
                    slideConfig = JSON.parse(slide.extrasConfig);
                } catch (err) {
                    console.error("ContentSlide:", err);
                }
                return (
                    <>
                        <hr className="mt-0 mb-3" />
                        <MultipleChoiceForm
                            choices={formChoice}
                            allowEmpty={true}
                            allowMultipleAnswers={
                                (slideConfig as IMultipleChoiceExtraConfigs)?.enableMultipleAnswers ?? false
                            }
                            onSubmit={handleSubmitForm}
                            disabled={disabled}
                        />
                    </>
                );
            }

            default: {
                return null;
            }
        }
    };

    return (
        <SlideWrapper imageUrl={slide.questionImageUrl ?? ""}>
            <Stack gap={2}>
                <h1 style={{ fontSize: `${slide}px` }}>{slide.question}</h1>

                <p>{slide.questionDescription}</p>

                {renderForm()}
            </Stack>
        </SlideWrapper>
    );
}
