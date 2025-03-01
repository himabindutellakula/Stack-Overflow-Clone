import { useState } from "react";

/**
 * Custom hook to manage the state and validation of the New Question Form.
 * @param {Function} addQuestion - Function to add a new question.
 * @param {Function} [handleQuestions] - Optional function to handle question navigation.
 * @returns {Object} - Returns form state, error state, and event handlers.
 */
export const useNewQuestionForm = (addQuestion: (question: { title: string; text: string; tags: string[]; askedBy: string; }) => void, handleQuestions?: () => void) => {
    /**
     * State for form data.
     */
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        tags: "",
        username: "",
    });

    /**
     * State for form validation errors.
     */
    const [errors, setErrors] = useState({
        title: "",
        text: "",
        tags: "",
        username: "",
    });

    /**
     * Validates the form input fields.
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    const validateForm = () => {
        const newErrors = { title: "", text: "", tags: "", username: "" };
        let isValid = true;

        // Title validation
        if (formData.title.length > 100) {
            newErrors.title = "Title cannot be more than 100 characters.";
            isValid = false;
        }
        if (!formData.title) {
            newErrors.title = "Question Title cannot be empty.";
            isValid = false;
        }

        // Text validation
        if (!formData.text) {
            newErrors.text = "Question text cannot be empty.";
            isValid = false;
        }

        // Tags validation
        if (!formData.tags) {
            newErrors.tags = "Tags cannot be empty.";
            isValid = false;
        }
        else {
            const tagsArray = formData.tags.split(/\s+/).filter(Boolean);
            if (tagsArray.length > 5) {
                newErrors.tags = "Cannot have more than 5 tags";
                isValid = false;
            }
            if (tagsArray.some(tag => tag.length > 20)) {
                newErrors.tags = "New tag length cannot be more than 20";
                isValid = false;
            }
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
            addQuestion({
                title: formData.title,
                text: formData.text,
                tags: formData.tags.split(/\s+/).filter(Boolean), // Convert tags to array
                askedBy: formData.username,
            });
            handleQuestions?.(); // Redirect if provided
            setFormData({ title: "", text: "", tags: "", username: "" }); // Reset form
        }
    };

    /**
     * Handles input change for form fields.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        const fieldMap: Record<string, string> = {
            formTitleInput: "title",
            formTextInput: "text",
            formTagInput: "tags",
            formUsernameInput: "username",
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