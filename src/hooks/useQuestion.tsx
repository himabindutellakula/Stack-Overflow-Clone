import { useCallback } from "react";
import { QuestionProps } from "../types/types";

/**
 * Custom hook to handle question interactions.
 * 
 * @param {QuestionProps} q - The question object.
 * @param {function} [handleAnswer] - Function to handle question click (optional).
 * @param {function} [clickTag] - Function to handle tag click (optional).
 * @returns custom hook to manage question page clicks.
 */
export const useQuestion = (q: QuestionProps, handleAnswer?: (qid: string) => void, clickTag?: (tagName: string) => void) => {
    /**
     * Handles when a user clicks on the question.
     */
    const handleQuestionClick = useCallback(() => {
        if (handleAnswer) handleAnswer(q.qid);
    }, [handleAnswer, q.qid]);

    /**
     * Handles when a user clicks on a tag.
     */
    const handleTagClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>, tagName: string) => {
            event.stopPropagation();
            clickTag?.(tagName);
        },
        [clickTag]
    );

    return {
        handleQuestionClick,
        handleTagClick,
    };
};
