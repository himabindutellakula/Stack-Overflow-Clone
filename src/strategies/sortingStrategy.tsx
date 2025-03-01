import Question from "../models/question";

/**
 * Interface representing a sorting strategy for questions.
 */
export interface SortingStrategy {
    /**
     * Sorts an array of questions based on a specific strategy.
     * @param {Question[]} questions - The list of questions to be sorted.
     * @returns {Question[]} - The sorted list of questions.
     */
    sort(questions: Question[]): Question[];
}
