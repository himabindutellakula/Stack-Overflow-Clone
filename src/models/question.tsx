import { getMetaData } from "../util/dateFormatter";
import { QuestionParamType, QuestionPropsInterface } from "../types/types";

/**
 * Represents a question object in a fake Stack Overflow system.
 * This class encapsulates details such as the question ID, title, content, tags, 
 * author information, timestamps, answer IDs, and view count.
 * It also provides various methods to interact with and update question details.
 */
export default class Question implements QuestionPropsInterface {
    private readonly _qid: string;
    private readonly _title: string;
    private readonly _text: string;
    private readonly _tagIds: string[];
    private readonly _askedBy: string;
    private readonly _askDate: Date;
    private _ansIds: string[];
    private _views: number;
    private _newAnsDate?: Date;

    /**
     * Constructs a Question object with the given properties.
     * 
     * @param {QuestionParamType} param0 - The object containing question properties.
     * @param {string} param0.qid - The unique identifier of the question.
     * @param {string} param0.title - The title of the question.
     * @param {string} param0.text - The content/body of the question.
     * @param {string[]} param0.tagIds - The list of tag IDs associated with the question.
     * @param {string} param0.askedBy - The name or identifier of the user who asked the question.
     * @param {Date} param0.askDate - The timestamp when the question was posted.
     * @param {string[]} param0.ansIds - The list of answer IDs associated with the question.
     * @param {number} param0.views - The number of times the question has been viewed.
     */
    constructor({ qid, title, text, tagIds, askedBy, askDate, ansIds, views }: QuestionParamType) {
        this._qid = qid;
        this._title = title;
        this._text = text;
        this._tagIds = tagIds;
        this._askedBy = askedBy;
        this._askDate = askDate;
        this._ansIds = ansIds;
        this._views = views;
    }

    /**
     * Gets the number of answers associated with the question.
     * 
     * @returns {number} - The total count of answers.
     */
    public getAnswerCount(): number {
        return this.ansIds.length;
    }

    /**
     * Adds a new answer ID to the question if it's not already present.
     * Updates the newest answer date to the current time.
     * 
     * @param {string} aid - The answer ID to be added.
     */
    public addAnswer(aid: string): void {
        if (!this._ansIds.includes(aid)) {
            this._ansIds = [...this._ansIds, aid];
            this._newAnsDate = new Date();
        }
    }

    /**
     * Gets the list of answer IDs associated with the question.
     * 
     * @returns {string[]} - An array of answer IDs.
     */
    public getAnswersId(): string[] {
        return [...this._ansIds];
    }

    /**
     * Gets the list of tag IDs associated with the question.
     * 
     * @returns {string[]} - An array of tag IDs.
     */
    public getTagsId(): string[] {
        return [...this._tagIds];
    }

    /**
     * Calculates the time elapsed since the question was posted.
     * 
     * @returns {string} - A human-readable representation of the time elapsed 
     * since the question was posted (e.g., "3 days ago").
     */
    public calculateTimeElapsed(): string {
        return getMetaData(this._askDate);
    }

    /**
     * Gets the number of views the question has received.
     * 
     * @returns {number} - The view count of the question.
     */
    public getQuestionViews(): number {
        return this._views;
    }

    /**
     * Increments the view count for the question by 1.
     */
    public addViewCount(): void {
        this._views++;
    }

    /**
     * Sets the date of the newest answer for the question.
     * Updates only if the provided date is more recent than the existing newest answer date.
     * 
     * @param {Date} date - The date to be compared and potentially set as the newest answer date.
     */
    public setNewestAnswerDate(date: Date): void {
        if (!this._newAnsDate || date > this._newAnsDate) {
            this._newAnsDate = date;
        }
    }

    /**
     * Sets the answer IDs for the question.
     * 
     * @param {string[]} value - An array of answer IDs.
     */
    public set ansIds(value: string[]) {
        this._ansIds = value;
    }

    /**
     * Sets the view count for the question.
     * 
     * @param {number} value - The new view count.
     */
    public set views(value: number) {
        this._views = value;
    }

    /**
     * Gets the unique identifier of the question.
     * 
     * @returns {string} - The question ID.
     */
    public get qid(): string {
        return this._qid;
    }

    /**
     * Gets the title of the question.
     * 
     * @returns {string} - The question title.
     */
    public get title(): string {
        return this._title;
    }

    /**
     * Gets the content/body of the question.
     * 
     * @returns {string} - The question text.
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Gets the list of tag IDs associated with the question.
     * 
     * @returns {string[]} - An array of tag IDs.
     */
    public get tagIds(): string[] {
        return [...this._tagIds];
    }

    /**
     * Gets the timestamp when the question was posted.
     * 
     * @returns {Date} - The date when the question was asked.
     */
    public get askDate(): Date {
        return this._askDate;
    }

    /**
     * Gets the name or identifier of the user who asked the question.
     * 
     * @returns {string} - The name or user ID of the question author.
     */
    public get askedBy(): string {
        return this._askedBy;
    }

    /**
     * Gets the date of the most recent answer to the question.
     * 
     * @returns {Date | undefined} - The timestamp of the newest answer, or `undefined` if no answers exist.
     */
    public get newAnsDate(): Date | undefined {
        return this._newAnsDate;
    }

    /**
     * Gets the number of views the question has received.
     * 
     * @returns {number} - The total number of views.
     */
    public get views(): number {
        return this._views;
    }

    /**
     * Gets all the answer Ids for the question.
     * 
     * @returns {string[]} - The total number of views.
     */
    public get ansIds(): string[] {
        return this._ansIds;
    }
}
