import { IBaseComponent } from "shared/interfaces";
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
    slide: {
        adminKey: string;
        question: string;
        questionDescription: string;
        questionImageUrl?: string;
        questionVideoUrl?: string;
        type: SlideType;
        active: boolean;
        hideInstructionBar: boolean;
        choices: ISlideChoice[];
        config?: Record<string, any>;
        position: number;
        textSize: number;
    };
    onSubmitChoice?: (choice: ISlideChoice) => void;
    disabled: boolean;
}

export default function ContentSlide(props: IContentSlideProps) {
    const { slide, onSubmitChoice, disabled } = props;

    const handleSubmitForm = (value: number) => {
        const choice = slide.choices.find((c) => c.id === value);
        if (!choice || !onSubmitChoice) {
            return;
        }

        onSubmitChoice(choice);
    };

    const formChoice = slide.choices
        .sort((left, right) => left.position - right.position)
        .map((choice) => ({ value: choice.id, label: choice.label }));

    /**
     * Render an appropriate form based on current slide type
     * @returns React.ReactNode
     */
    const renderForm = (): React.ReactNode => {
        switch (slide.type) {
            case "multiple_choice": {
                return (
                    <>
                        <hr className="mt-0 mb-3" />
                        <MultipleChoiceForm
                            choices={formChoice}
                            allowEmpty={true}
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
        <SlideWrapper imageUrl={slide.questionImageUrl}>
            <Stack gap={2}>
                <h1 style={{ fontSize: `${slide}px` }}>{slide.question}</h1>

                <p>{slide.questionDescription}</p>

                {renderForm()}
            </Stack>
        </SlideWrapper>
    );
}
