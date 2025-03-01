import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import "./index.css";
import { NewQuestionProps } from "../../../types/types";
import { useNewQuestionForm } from "../../../hooks/useNewQuestionForm";

/**
 * The `NewQuestion` component represents a form for users to post a new question.
 * It includes input fields for the question title, description, tags, and username.
 * The component utilizes a custom hook `useNewQuestionForm` to manage form state and validation.
 * @param {NewQuestionProps} param0 - The properties passed to the `NewQuestion` component.
 * @param {Function} param0.addQuestion - Function to add a new question.
 * @param {Function} param0.handleQuestions - Function to handle question and redirect to home page.
 * @returns {JSX.Element} - The rendered `NewQuestion` form component.
 */
const NewQuestion = ({ addQuestion, handleQuestions }: NewQuestionProps): JSX.Element => {
    // Custom hook for managing form state and validation
    const { formData, errors, handleChange, handleSubmit } = useNewQuestionForm(addQuestion, handleQuestions);

    return (
        <div className="form-container">
            <Form>
                {/* Form for submitting a new question */}
                <form onSubmit={handleSubmit} className="question-form">
                    
                    {/* Input for Question Title */}
                    <Input
                        id="formTitleInput"
                        title="Question Title"
                        hint="Limit title to 100 characters or less"
                        val={formData.title}
                        setState={(value) => handleChange({ target: { id: "formTitleInput", value } } as any)}
                        err={errors.title}
                    />

                    {/* Textarea for Question Text */}
                    <Textarea
                        id="formTextInput"
                        title="Question Text"
                        hint="Provide details to help others understand your question"
                        val={formData.text}
                        setState={(value) => handleChange({ target: { id: "formTextInput", value } } as any)}
                        err={errors.text}
                    />

                    {/* Input for Tags */}
                    <Input
                        id="formTagInput"
                        title="Tags"
                        hint="Add keywords separated by whitespace"
                        val={formData.tags}
                        setState={(value) => handleChange({ target: { id: "formTagInput", value } } as any)}
                        err={errors.tags}
                    />

                    {/* Input for Username */}
                    <Input
                        id="formUsernameInput"
                        title="Username"
                        val={formData.username}
                        setState={(value) => handleChange({ target: { id: "formUsernameInput", value } } as any)}
                        err={errors.username}
                    />

                    {/* Form Footer with Submit Button and Mandatory Note */}
                    <div className="form-footer">
                        <button type="submit" className="submit-btn">Post Question</button>
                        <p className="mandatory-note">* indicates mandatory fields</p>
                    </div>

                </form>
            </Form>
        </div>
    );
};

export default NewQuestion;