import { TagParamType } from "../types/types";

/**
 * Represents a tag object in a fake Stack Overflow system.
 * A tag is used to categorize and label questions based on topics.
 */
export default class Tag {
    private readonly _tid: string;
    private readonly _name: string;

    /**
     * Constructs a Tag object with the given properties.
     * 
     * @param {TagParamType} param0 - The object containing tag properties.
     * @param {string} param0.tid - The unique identifier of the tag.
     * @param {string} param0.name - The name of the tag.
     */
    constructor({ tid, name }: TagParamType) {
        this._tid = tid;
        this._name = name;
    }

    /**
     * Gets the unique identifier of the tag.
     * 
     * @returns {string} - The tag ID.
     */
    public get tid(): string {
        return this._tid;
    }

    /**
     * Gets the name of the tag.
     * 
     * @returns {string} - The tag name.
     */
    public get name(): string {
        return this._name;
    }
}
