import PageClass from ".";
import NewAnswer from "../Main/newAnswer";
import { StringHandler, ApplicationInterface } from "../../types/types";

/**
 * Represents the `NewAnswerPageClass`, which extends `PageClass` and 
 * is responsible for rendering the New Answer Page in the application.
 * It follows the Builder pattern to configure necessary handlers before rendering.
 * 
 * @extends {PageClass}
 */
export default class NewAnswerPageClass extends PageClass {

    /**
     * Function to handle when an answer is submitted.
     */
    private handleAnswer?: StringHandler;

    /**
     * Private constructor to initialize the `NewAnswerPageClass` with an application instance.
     * This class follows the Builder pattern, so it should be instantiated using `NewAnswerPageClassBuilder`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Static builder method to create an instance of `NewAnswerPageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     * @returns {NewAnswerPageClass} - A new instance of `NewAnswerPageClass`.
     */
    public static NewAnswerPageClassBuilder(app: ApplicationInterface): NewAnswerPageClass {
        return new NewAnswerPageClass(app);
    }

    /**
     * Sets the function to handle when an answer is submitted.
     * 
     * @param {StringHandler} handleAnswer - Function to handle answer submissions.
     * @returns {NewAnswerPageClass} - Returns the instance of `NewAnswerPageClass` for method chaining.
     */
    public setHandleAnswerFunc(handleAnswer: StringHandler): NewAnswerPageClass {
        this.handleAnswer = handleAnswer;
        return this;
    }

    /**
     * Finalizes the builder pattern setup and returns the `NewAnswerPageClass` instance.
     * 
     * @returns {NewAnswerPageClass} - Returns the fully constructed instance.
     */
    public build(): NewAnswerPageClass {
        return this;
    }

    /**
     * Returns the JSX content for the New Answer Page.
     * 
     * @returns {JSX.Element} - The rendered `NewAnswer` component.
     */
    public getContent(): JSX.Element {
        return <NewAnswer qid={this.qid} addAnswer={this.getApp().addAnswer} handleAnswer={this.handleAnswer} />;
    }

    /**
     * Returns the selected page identifier.
     * Since there is no specific identifier, it returns an empty string.
     * 
     * @returns {string} - An empty string indicating no specific page identifier.
     */
    public getSelected(): string {
        return "";
    }
}
