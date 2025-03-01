import React from "react";
import PageClass from "./index";
import TagPage from "../Main/tagPage";
import { ApplicationInterface, StringHandler, NoParamHandler } from "../../types/types";

/**
 * Represents the `TagPageClass`, which extends `PageClass` and 
 * is responsible for rendering the Tag Page in the application.
 * It follows the Builder pattern to set up necessary handlers before rendering.
 * 
 * @extends {PageClass}
 */
export default class TagPageClass extends PageClass {

    /**
     * Function to handle tag click events.
     */
    private clickTag?: StringHandler;

    /**
     * Function to handle new question submissions.
     */
    private handleNewQuestion?: NoParamHandler;

    /**
     * Private constructor to initialize the `TagPageClass` with an application instance.
     * This class follows the Builder pattern, so it should be instantiated using `TagPageClassBuilder`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Static builder method to create an instance of `TagPageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     * @returns {TagPageClass} - A new instance of `TagPageClass`.
     */
    public static TagPageClassBuilder(app: ApplicationInterface): TagPageClass {
        return new TagPageClass(app);
    }

    /**
     * Sets the function to handle tag click events.
     * 
     * @param {StringHandler} clickTag - A function that takes a string (tag name) as input.
     * @returns {TagPageClass} - Returns the instance of `TagPageClass` for method chaining.
     */
    public setClickTagFunc(clickTag: StringHandler): TagPageClass {
        this.clickTag = clickTag;
        return this;
    }

    /**
     * Sets the function to handle new question submissions.
     * 
     * @param {NoParamHandler} handleNewQuestion - A function with no parameters that handles question submission.
     * @returns {TagPageClass} - Returns the instance of `TagPageClass` for method chaining.
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): TagPageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Finalizes the builder pattern setup and returns the `TagPageClass` instance.
     * 
     * @returns {TagPageClass} - Returns the fully constructed instance.
     */
    public build(): TagPageClass {
        return this;
    }

    /**
     * Returns the JSX content for the Tag Page.
     * 
     * @returns {JSX.Element} - The rendered `TagPage` component.
     */
    public getContent(): JSX.Element {
        return (
            <TagPage
                tlist={this.getApp().getTags()}
                getQuestionCountByTag={this.getApp().getQuestionCountByTag}
                clickTag={this.clickTag}
                handleNewQuestion={this.handleNewQuestion}
            />
        );
    }

    /**
     * Returns the selected page identifier.
     * 
     * @returns {string} - The identifier `"t"` representing the Tag Page.
     */
    public getSelected(): string {
        return "t";
    }
}
