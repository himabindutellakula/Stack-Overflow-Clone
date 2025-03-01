import { useState } from "react";

/**
 * Custom hook to manage the state and validation of the New Answer Form.
 * @param {string} qid - The question ID.
 * @param {Function} addAnswer - Function to add a new answer.
 * @param {Function} handleAnswer - Function to reset the page after adding an answer.
 * @returns {Object} - Returns form state, error state, and event handlers.
 */
export const useNewAnswerForm = (qid: string, addAnswer: (qid: string, answer: { text: string; ansBy: string }) => void, handleAnswer?: (qid: string) => void) => {
    /**
     * State for form data.
     */
    const [formData, setFormData] = useState({
        text: "",
        username: "",
    });

    /**
     * State for form validation errors.
     */
    const [errors, setErrors] = useState({
        text: "",
        username: "",
    });

    /**
     * Validates the form input fields.
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    const validateForm = () => {
        const newErrors = { text: "", username: "" };
        let isValid = true;

        // Text validation
        if (!formData.text) {
            newErrors.text = "Answer text cannot be empty.";
            isValid = false;
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = "Username cannot be empty.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    /**
     * Handles form submission.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            addAnswer(qid, {
                text: formData.text,
                ansBy: formData.username,
            });
            if (handleAnswer) {
                handleAnswer(qid);
            }
            setFormData({ text: "", username: "" }); // Reset form
        }
    };

    /**
     * Handles input change for form fields.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        
        const fieldMap: Record<string, string> = {
            answerTextInput: "text",
            answerUsernameInput: "username",
        };
    
        const fieldName = fieldMap[id]; // Map ID to formData key
        if (fieldName) {
            setFormData({ ...formData, [fieldName]: value });
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};
