import { getMetaData } from "../util/dateFormatter";
import { AnswerParamType, AnswerPropsInterface } from "../types/types";

/**
 * Represents an answer object in a fake stack overflow system.
 * This class encapsulates details such as the answer ID, text, 
 * the author of the answer, and the timestamp when the answer was posted.
 * It also provides a method to calculate the time elapsed since the answer was posted.
 */
export default class Answer implements AnswerPropsInterface {
    private readonly _aid: string;
    private readonly _text: string;
    private readonly _ansBy: string;
    private readonly _ansDate: Date;

    /**
     * Constructs an Answer object with the given properties.
     * 
     * @param {AnswerParamType} param0 - The object containing answer properties.
     * @param {string} param0.aid - The unique identifier of the answer.
     * @param {string} param0.text - The content of the answer.
     * @param {string} param0.ansBy - The name or identifier of the person who provided the answer.
     * @param {Date} param0.ansDate - The date and time when the answer was posted.
     */
    constructor({ aid, text, ansBy, ansDate }: AnswerParamType) {
        this._aid = aid;
        this._text = text;
        this._ansBy = ansBy;
        this._ansDate = ansDate;
    }

    /**
     * Calculates and returns the time elapsed since the answer was posted.
     * The elapsed time is formatted into a human-readable string.
     * 
     * @returns {string} - A human-readable representation of the time elapsed 
     * since the answer was posted (e.g., "2 hours ago").
     */
    public calculateTimeElapsed(): string {
        return getMetaData(this._ansDate);
    }

    /**
     * Gets the unique identifier of the answer.
     * 
     * @returns {string} - The answer ID.
     */
    public get aid(): string {
        return this._aid;
    }

    /**
     * Gets the content of the answer.
     * 
     * @returns {string} - The text of the answer.
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Gets the name or identifier of the person who provided the answer.
     * 
     * @returns {string} - The name or user ID of the answer's author.
     */
    public get ansBy(): string {
        return this._ansBy;
    }

    /**
     * Gets the date and time when the answer was posted.
     * 
     * @returns {Date} - The timestamp of the answer.
     */
    public get ansDate(): Date {
        return this._ansDate;
    }
}