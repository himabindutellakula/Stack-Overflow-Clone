import PageClass from './index';
import QuestionPage from '../Main/questionPage';
import { ApplicationInterface, SetQuestionPage, StringHandler, NoParamHandler } from '../../types/types';

/**
 * Represents the `HomePageClass`, which extends `PageClass` and 
 * is responsible for rendering the home page displaying questions.
 * It follows the Builder pattern to set up necessary handlers before rendering.
 * 
 * @extends {PageClass}
 */
export default class HomePageClass extends PageClass {
    
    /**
     * Function to set the question page state.
     */
    private setQuestionPage?: SetQuestionPage;

    /**
     * Function to set the question order type (e.g., newest, most viewed).
     */
    private setQuestionOrder?: StringHandler;

    /**
     * Function to handle when an answer is clicked.
     */
    public handleAnswer?: StringHandler;

    /**
     * Function to handle when a tag is clicked.
     */
    public clickTag?: StringHandler;

    /**
     * Function to handle the creation of a new question.
     */
    public handleNewQuestion?: NoParamHandler;

    /**
     * Private constructor to initialize the `HomePageClass` with an application instance.
     * This class follows the Builder pattern, so it should be instantiated using `HomePageClassBuilder`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Static builder method to create an instance of `HomePageClass`.
     * 
     * @param {ApplicationInterface} app - The application interface instance.
     * @returns {HomePageClass} - A new instance of `HomePageClass`.
     */
    public static HomePageClassBuilder(app: ApplicationInterface): HomePageClass {
        return new HomePageClass(app);
    }

    /**
     * Sets the function to update the question page.
     * 
     * @param {SetQuestionPage} setQuestionPage - Function to update the question page.
     * @returns {HomePageClass} - Returns the instance of `HomePageClass` for method chaining.
     */
    public setSetQuestionPageFunc(setQuestionPage: SetQuestionPage): HomePageClass {
        this.setQuestionPage = setQuestionPage;
        return this;
    }

    /**
     * Sets the function to update the question order.
     * 
     * @param {StringHandler} setQuestionOrder - Function to set the question order.
     * @returns {HomePageClass} - Returns the instance of `HomePageClass` for method chaining.
     */
    public setSetQuestionOrderFunc(setQuestionOrder: StringHandler): HomePageClass {
        this.setQuestionOrder = setQuestionOrder;
        return this;
    }

    /**
     * Sets the function to handle when an answer is clicked.
     * 
     * @param {StringHandler} handleAnswer - Function to handle answer clicks.
     * @returns {HomePageClass} - Returns the instance of `HomePageClass` for method chaining.
     */
    public setHandleAnswerFunc(handleAnswer: StringHandler): HomePageClass {
        this.handleAnswer = handleAnswer;
        return this;
    }

    /**
     * Sets the function to handle when a tag is clicked.
     * 
     * @param {StringHandler} clickTag - Function to handle tag clicks.
     * @returns {HomePageClass} - Returns the instance of `HomePageClass` for method chaining.
     */
    public setClickTagFunc(clickTag: StringHandler): HomePageClass {
        this.clickTag = clickTag;
        return this;
    }

    /**
     * Sets the function to handle the creation of a new question.
     * 
     * @param {NoParamHandler} handleNewQuestion - Function to handle new question creation.
     * @returns {HomePageClass} - Returns the instance of `HomePageClass` for method chaining.
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): HomePageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Finalizes the builder pattern setup and returns the `HomePageClass` instance.
     * 
     * @returns {HomePageClass} - Returns the fully constructed instance.
     */
    public build(): HomePageClass {
        return this;
    }

    /**
     * Returns the JSX content for the Home Page.
     * 
     * @returns {JSX.Element | null} - The rendered `QuestionPage` component or `null` if an error occurs.
     */
    public getContent(): JSX.Element | null {
        try {
            const qFilterResult = this.getApp().getQuestionsByFilter(
                this.pageIndex, 
                this.questionOrder?.toLowerCase(), 
                this.search
            );

            return (
                <QuestionPage
                    title_text={this.title}
                    qlist={qFilterResult.qSlice}
                    qSize={qFilterResult.qLength}
                    search={this.search}
                    pageNum={this.pageIndex}
                    getTagById={this.getApp().getTagById}
                    setQuestionOrder={this.setQuestionOrder}
                    clickTag={this.clickTag}
                    handleAnswer={this.handleAnswer}
                    handleNewQuestion={this.handleNewQuestion}
                    setQuestionPage={this.setQuestionPage}
                />
            );
        } catch (e) {
            console.error(`Failed to set QuestionPage props: ${e}`);
            return null;
        }
    }

    /**
     * Returns the selected page identifier.
     * 
     * @returns {string} - The identifier `"q"` representing the Home Page.
     */
    public getSelected(): string {
        return "q";
    }
}
