import { SortingStrategy } from "./sortingStrategy";
import Question from "../models/question";

/**
 * Sorting strategy for ordering questions based on recent activity.
 * This includes sorting by the latest answer date, prioritizing
 * answered questions before unanswered ones.
 */
export class ActiveSort implements SortingStrategy {
    /**
     * Sorts questions based on recent activity:
     * - Answered questions are sorted by their latest answer date.
     * - Unanswered questions are sorted by their creation date.
     * @param {Question[]} questions - The list of questions to be sorted.
     * @returns {Question[]} - The sorted list of questions.
     */
    sort(questions: Question[]): Question[] {
        return questions.sort((a, b) => {
            const lastA = a.newAnsDate?.getTime() || 0;
            const lastB = b.newAnsDate?.getTime() || 0;
            return lastB !== lastA ? lastB - lastA : b.askDate.getTime() - a.askDate.getTime();
        });
    }
}
