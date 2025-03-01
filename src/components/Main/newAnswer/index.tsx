import React from "react";
import "./index.css";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import { NewAnswerProps } from "../../../types/types";
import { useNewAnswerForm } from "../../../hooks/useNewAnswerForm";

/**
 * A component to render the form for adding a new answer.
 * @param {NewAnswerProps} param0 - The props passed to the component.
 * @param {string} param0.qid - The question ID.
 * @param {Function} param0.addAnswer - Function to add the answer.
 * @param {Function} param0.handleAnswer - Optional function to reset the page if the answer is added.
 * @returns {JSX.Element} - A form to add a new answer.
 */
const NewAnswer = ({ qid, addAnswer, handleAnswer }: NewAnswerProps) => {
    const { formData, errors, handleChange, handleSubmit } = useNewAnswerForm(qid, addAnswer, handleAnswer);

    return (
        <div className="form-container">
            <Form>
                <form onSubmit={handleSubmit} className="answer-form">
                    {/* Input for Username */}
                    <Input
                        id="answerUsernameInput"
                        title="Username"
                        val={formData.username}
                        setState={(value) => handleChange({ target: { id: "answerUsernameInput", value } } as any)}
                        err={errors.username}
                    />

                    {/* TextArea for Answer */}
                    <Textarea
                        id="answerTextInput"
                        title="Answer Text"
                        val={formData.text}
                        setState={(value) => handleChange({ target: { id: "answerTextInput", value } } as any)}
                        err={errors.text}
                    />

                    <div className="form-footer">
                        <button type="submit" className="submit-btn">Post Answer</button>
                        <p className="mandatory-note">* indicates mandatory fields</p>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewAnswer;