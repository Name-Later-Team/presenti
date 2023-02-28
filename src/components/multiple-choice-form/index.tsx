import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../styles/modules/MultipleChoiceForm.module.scss";

const choices = [
    { value: 1, label: "Label 1" },
    { value: 2, label: "Label 2" },
    { value: 3, label: "Label 3" },
];

export default function MultipleChoiceForm() {
    const [checked, setChecked] = useState("");

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setChecked(target.value);
    };
    return (
        <Form>
            <Form.Group className="mb-3">
                {choices.map((choice) => {
                    return (
                        <fieldset
                            className={`border border-2 rounded mb-3 ${styles["custom-check"]}`}
                            key={choice.value}
                        >
                            <Form.Label className={`mb-0 ${styles["custom-check-label"]}`}>
                                <Form.Check.Input
                                    type={"radio"}
                                    checked={checked === `${choice.value}`}
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
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2" size="lg">
                Submit
            </Button>
            <Button
                variant="text-secondary"
                type="button"
                className="w-100"
                size="lg"
                onClick={() => {
                    setChecked("");
                }}
            >
                Clear
            </Button>
        </Form>
    );
}
