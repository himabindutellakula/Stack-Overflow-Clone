import PageClass from './index';
import AnswerPage from '../Main/answerPage';
import { ApplicationInterface, NoParamHandler } from '../../types/types';

/**
 * Represents the `AnswerPageClass`, which extends `PageClass` and 
 * is responsible for rendering the Answer Page in the application.
 * It follows the Builder pattern to configure necessary handlers before rendering.
 * 
 * @extends {PageClass}
 */
export default class AnswerPageClass extends PageClass {
    
    /**
     * Function to handle new question submissions.
     */
    public handleNewQuestion?: NoParamHandler;

    /**
     * Function to handle new answer submissions.
     */
    public handleNewAnswer?: NoParamHandler;

    /**
     * Private constructor to initialize the `AnswerPageClass` with an application instance.
     * This class follows the Builder pattern, so it should be instantiated using `AnswerPageClassBuilder`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Static builder method to create an instance of `AnswerPageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     * @returns {AnswerPageClass} - A new instance of `AnswerPageClass`.
     */
    public static AnswerPageClassBuilder(app: ApplicationInterface): AnswerPageClass {
        return new AnswerPageClass(app);
    }

    /**
     * Sets the function to handle new question submissions.
     * 
     * @param {NoParamHandler} handleNewQuestion - Function to handle new question creation.
     * @returns {AnswerPageClass} - Returns the instance of `AnswerPageClass` for method chaining.
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): AnswerPageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Sets the function to handle new answer submissions.
     * 
     * @param {NoParamHandler} handleNewAnswer - Function to handle new answer creation.
     * @returns {AnswerPageClass} - Returns the instance of `AnswerPageClass` for method chaining.
     */
    public setHandleNewAnswerFunc(handleNewAnswer: NoParamHandler): AnswerPageClass {
        this.handleNewAnswer = handleNewAnswer;
        return this;
    }

    /**
     * Finalizes the builder pattern setup and returns the `AnswerPageClass` instance.
     * 
     * @returns {AnswerPageClass} - Returns the fully constructed instance.
     */
    public build(): AnswerPageClass {
        return this;
    }

    /**
     * Returns the JSX content for the Answer Page.
     * If the question does not exist, it renders an error message.
     * 
     * @returns {JSX.Element} - The rendered `AnswerPage` component or an error message if the question is not found.
     */
    public getContent(): JSX.Element {
        const question = this.getApp().getQuestionById(this.qid);

        if (!question) {
            return (
                <div>
                    <h1>Question Not Found</h1>
                    <p>The question you are looking for does not exist or has been removed.</p>
                </div>
            );
        }

        const answers = this.getApp().getQuestionAnswer(question) || [];
        return (
            <AnswerPage 
                question={question} 
                ans={answers} 
                handleNewAnswer={this.handleNewAnswer} 
                handleNewQuestion={this.handleNewQuestion} 
            />
        );
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