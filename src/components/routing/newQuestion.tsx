import PageClass from "./index";
import NewQuestion from "../Main/newQuestion";
import { ApplicationInterface, NoParamHandler } from "../../types/types";

/**
 * Represents the `NewQuestionPageClass`, which extends `PageClass` and 
 * is responsible for rendering the New Question Page in the application.
 * It follows the Builder pattern to configure necessary handlers before rendering.
 * 
 * @extends {PageClass}
 */
export default class NewQuestionPageClass extends PageClass {

    /**
     * Function to handle updates related to questions.
     */
    private handleQuestions?: NoParamHandler;

    /**
     * Private constructor to initialize the `NewQuestionPageClass` with an application instance.
     * This class follows the Builder pattern, so it should be instantiated using `NewQuestionPageClassBuilder`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Static builder method to create an instance of `NewQuestionPageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     * @returns {NewQuestionPageClass} - A new instance of `NewQuestionPageClass`.
     */
    public static NewQuestionPageClassBuilder(app: ApplicationInterface): NewQuestionPageClass {
        return new NewQuestionPageClass(app);
    }

    /**
     * Sets the function to handle updates related to questions.
     * 
     * @param {NoParamHandler} handleQuestions - Function to handle question-related updates.
     * @returns {NewQuestionPageClass} - Returns the instance of `NewQuestionPageClass` for method chaining.
     */
    public setHandleQuestionsFunc(handleQuestions: NoParamHandler): NewQuestionPageClass {
        this.handleQuestions = handleQuestions;
        return this;
    }

    /**
     * Finalizes the builder pattern setup and returns the `NewQuestionPageClass` instance.
     * 
     * @returns {NewQuestionPageClass} - Returns the fully constructed instance.
     */
    public build(): NewQuestionPageClass {
        return this;
    }

    /**
     * Returns the JSX content for the New Question Page.
     * 
     * @returns {JSX.Element} - The rendered `NewQuestion` component.
     */
    public getContent(): JSX.Element {
        console.log(this);
        return <NewQuestion addQuestion={this.getApp().addQuestion} handleQuestions={this.handleQuestions} />;
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
