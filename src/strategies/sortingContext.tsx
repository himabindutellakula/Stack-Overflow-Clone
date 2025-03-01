import { SortingStrategy } from "./sortingStrategy";
import { NewestSort } from "./newestSort";
import { ActiveSort } from "./activeSort";
import { UnansweredSort } from "./unansweredSort";
import Question from "../models/question";

/**
 * Context class for dynamically selecting and applying a sorting strategy.
 */
export class SortingContext {
    private strategy: SortingStrategy;

    /**
     * Constructs a new SortingContext with a selected sorting strategy.
     * Defaults to "newest" if an invalid orderType is provided.
     * 
     * @param {string} orderType - The sorting order to apply ("newest", "active", "unanswered").
     */
    constructor(orderType: string) {
        this.strategy = this.selectStrategy(orderType);
    }

    /**
     * Selects the appropriate sorting strategy based on the provided order type.
     * @param {string} orderType - The sorting order ("newest", "active", "unanswered").
     * @returns {SortingStrategy} - The selected sorting strategy.
     */
    private selectStrategy(orderType: string): SortingStrategy {
        switch (orderType.toLowerCase()) {
            case "newest":
                return new NewestSort();
            case "active":
                return new ActiveSort();
            case "unanswered":
                return new UnansweredSort();
            default:
                return new NewestSort(); // Default to newest sorting
        }
    }

    /**
     * Sorts the given list of questions using the selected sorting strategy.
     * @param {Question[]} questions - The list of questions to be sorted.
     * @returns {Question[]} - The sorted list of questions.
     */
    public sort(questions: Question[]): Question[] {
        return this.strategy.sort(questions);
    }
}
