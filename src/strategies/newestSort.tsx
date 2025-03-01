import { SortingStrategy } from "./sortingStrategy";
import Question from "../models/question";

/**
 * Sorting strategy for ordering questions by their creation date (newest first).
 */
export class NewestSort implements SortingStrategy {
    /**
     * Sorts questions in descending order based on their creation date.
     * @param {Question[]} questions - The list of questions to be sorted.
     * @returns {Question[]} - The sorted list of questions.
     */
    sort(questions: Question[]): Question[] {
        return questions.sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
    }
}
