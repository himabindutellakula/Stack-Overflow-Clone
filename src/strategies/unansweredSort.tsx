import { SortingStrategy } from "./sortingStrategy";
import Question from "../models/question";

/**
 * Sorting strategy for ordering questions based on unanswered status.
 * Prioritizes questions that have no answers, sorted by creation date.
 */
export class UnansweredSort implements SortingStrategy {
    /**
     * Sorts unanswered questions by their creation date (newest first).
     * @param {Question[]} questions - The list of questions to be sorted.
     * @returns {Question[]} - The sorted list of unanswered questions.
     */
    sort(questions: Question[]): Question[] {
        return questions
            .filter(q => q.getAnswerCount() === 0)
            .sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
    }
}
