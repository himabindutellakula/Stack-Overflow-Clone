import { PaginationProps } from "../types/types";

/**
 * Custom hook to manage pagination state.
 * @param {PaginationProps} props - The pagination properties.
 * @returns Pagination state and handlers.
 */
export const usePagination = ({ pageNum, qSize, search = "", title, setQuestionPage }: PaginationProps) => {
    const QUESTIONS_PER_PAGE = 5;

    /**
     * Handler for navigating to the next page.
     */
    const handleNext = () => {
        if (pageNum + QUESTIONS_PER_PAGE < qSize) {
            setQuestionPage?.(pageNum + QUESTIONS_PER_PAGE, search, title);
        } else {
            setQuestionPage?.(0, search, title); // Wrap around to first page
        }
    };

    /**
     * Handler for navigating to the previous page.
     */
    const handlePrev = () => {
        if (pageNum > 0) {
            setQuestionPage?.(pageNum - QUESTIONS_PER_PAGE, search, title);
        }
    };

    return {
        handleNext,
        handlePrev,
        isFirstPage: pageNum === 0,
        isLastPage: pageNum + 1 >= Math.ceil(qSize / QUESTIONS_PER_PAGE),
    };
};
