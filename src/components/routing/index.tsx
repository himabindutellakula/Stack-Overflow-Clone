import { ApplicationInterface } from "../../types/types";

/**
 * Abstract class representing a page in the application.
 * It provides methods to manage page-related properties such as search term,
 * question order, title, question ID, and page index.
 * 
 * Classes extending `PageClass` must implement `getContent` and `getSelected` methods.
 * @abstract
 */
export default abstract class PageClass {
    /**
     * Reference to the application interface.
     */
    private app: ApplicationInterface;

    /**
     * The search term used to filter content on the page.
     */
    protected search?: string;

    /**
     * The order type in which questions should be displayed (e.g., newest, active, unanswered).
     */
    protected questionOrder?: string;

    /**
     * The title of the page.
     */
    protected title?: string;

    /**
     * The ID of a selected question.
     */
    protected qid = "";

    /**
     * The index of the current page (pagination).
     */
    protected pageIndex = 0;

    /**
     * Creates an instance of `PageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    protected constructor(app: ApplicationInterface) {
        this.app = app;
    }

    /**
     * Sets the search term for filtering content on the page.
     * 
     * @param {string} search - The search query string.
     */
    public setSearch(search: string): void {
        this.search = search;
    }

    /**
     * Sets the order type for displaying questions (e.g., newest, most viewed).
     * 
     * @param {string} questionOrder - The question order type.
     */
    public setQuestionOrderType(questionOrder: string): void {
        this.questionOrder = questionOrder;
    }

    /**
     * Sets the ID of a selected question.
     * 
     * @param {string} qid - The question ID.
     */
    public setQid(qid: string): void {
        this.qid = qid;
    }

    /**
     * Sets the title of the page.
     * 
     * @param {string} title - The title of the page.
     */
    public setTitle(title: string): void {
        this.title = title;
    }

    /**
     * Sets the index of the current page for pagination purposes.
     * 
     * @param {number} index - The page index.
     */
    public setPageIndex(index: number): void {
        this.pageIndex = index;
    }

    /**
     * Returns the application interface instance.
     * 
     * @returns {ApplicationInterface} - The application instance.
     */
    public getApp(): ApplicationInterface {
        return this.app;
    }

    /**
     * Abstract method that must be implemented by subclasses to return the page content.
     * 
     * @abstract
     * @returns {JSX.Element | null} - The JSX content to be rendered on the page.
     */
    public abstract getContent(): JSX.Element | null;

    /**
     * Abstract method that must be implemented by subclasses to return the selected page identifier.
     * 
     * @abstract
     * @returns {string} - The identifier of the selected page.
     */
    public abstract getSelected(): string;
}
