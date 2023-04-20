import React, { ChangeEvent, useState } from "react";
import { Button, Form, FormText } from "react-bootstrap";
import styles from "../../../../styles/modules/MultipleChoiceForm.module.scss";
import { IBaseComponent } from "shared/interfaces";

export interface IMultipleChoiceFormProps extends IBaseComponent {
    choices: Array<{
        value: number;
        label: string;
    }>;
    allowEmpty: boolean;
    allowMultipleAnswers: boolean;
    disabled?: boolean;
    onSubmit?: (value: number[]) => void;
}

export default function MultipleChoiceForm(props: IMultipleChoiceFormProps) {
    const { choices, disabled, allowEmpty, allowMultipleAnswers, onSubmit } = props;

    const [checked, setChecked] = useState<string[]>([]);
    const [hasError, setHasError] = useState(false);

    const handleSubmitForm = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (checked.length === 0) {
            setHasError(true);
            return;
        }

        setHasError(false);
        onSubmit && onSubmit(checked.map((item) => parseInt(item)));
    };

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setChecked((prev) => {
            if (!allowMultipleAnswers) return [target.value];
            if (prev.some((item) => item === target.value)) return prev;
            return [...prev, target.value];
        });
    };

    return (
        <Form onSubmit={handleSubmitForm}>
            {allowMultipleAnswers && (
                <div className="mb-2">
                    <FormText>Có thể chọn nhiều lựa chọn</FormText>
                </div>
            )}
            <Form.Group className="mb-3">
                {choices.map((choice) => {
                    return (
                        <fieldset
                            className={`border border-2 rounded mb-3 ${styles["custom-check"]}`}
                            key={choice.value}
                        >
                            <Form.Label className={`mb-0 ${styles["custom-check-label"]}`}>
                                <Form.Check.Input
                                    type={allowMultipleAnswers ? "checkbox" : "radio"}
                                    checked={checked.some((item) => item === `${choice.value}`)}
                                    value={choice.value}
                                    onChange={handleOptionChange}
                                    name="option"
                                    className={styles["custom-check-input"]}
                                />
                                <div className={styles["custom-check-title"]}>
                                    <span>{choice.label}</span>
                                </div>
                            </Form.Label>
                        </fieldset>
                    );
                })}
                {hasError && <FormText className="text-danger mb-3">Không được bỏ trống lựa chọn</FormText>}
            </Form.Group>
            <Button disabled={disabled} variant="primary" type="submit" className="w-100 mb-2" size="lg">
                Gửi
            </Button>
            {checked.length !== 0 && allowEmpty && (
                <Button
                    variant="text-secondary"
                    type="button"
                    className="w-100"
                    size="lg"
                    onClick={() => {
                        setChecked([]);
                    }}
                >
                    Xóa lựa chọn
                </Button>
            )}
        </Form>
    );
}
