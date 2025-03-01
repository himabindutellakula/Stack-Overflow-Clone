import { PageClassParams } from "../../types/types";
import PageClass from ".";
import NewQuestionPageClass from "./newQuestion";
import NewAnswerPageClass from "./newAnswer";
import AnswerPageClass from "./answer";
import HomePageClass from "./home";
import TagPageClass from "./tag";

/**
 * Factory function to retrieve a page instance based on `pageName`.
 * It initializes and configures the appropriate page class using the Builder pattern.
 * 
 * @function
 * @param {Object} param0 - The options for retrieving a page instance.
 * @param {string} param0.pageName - The name of the page to retrieve.
 * @param {PageClassParams} param0.params - Parameters required to configure the page class.
 * @returns {PageClass} - The configured instance of the corresponding `PageClass` subclass.
 */
export default function getPage({ pageName, params }: { pageName: string; params: PageClassParams }): PageClass {
    const { app, clickTag, handleAnswer, handleNewQuestion, setQuestionOrder, setQuestionPage, handleQuestions, handleNewAnswer } = params;

    // Factory pattern: Map page names to their respective builder functions
    const pageBuilders: Record<string, () => PageClass> = {
        home: () => HomePageClass.HomePageClassBuilder(app)
            .setClickTagFunc(clickTag)
            .setHandleAnswerFunc(handleAnswer)
            .setHandleNewQuestionFunc(handleNewQuestion)
            .setSetQuestionOrderFunc(setQuestionOrder)
            .setSetQuestionPageFunc(setQuestionPage)
            .build(),

        tag: () => TagPageClass.TagPageClassBuilder(app)
            .setClickTagFunc(clickTag)
            .setHandleNewQuestionFunc(handleNewQuestion)
            .build(),

        newQuestion: () => NewQuestionPageClass.NewQuestionPageClassBuilder(app)
            .setHandleQuestionsFunc(handleQuestions)
            .build(),

        newAnswer: () => NewAnswerPageClass.NewAnswerPageClassBuilder(app)
            .setHandleAnswerFunc(handleAnswer)
            .build(),

        answer: () => AnswerPageClass.AnswerPageClassBuilder(app)
            .setHandleNewAnswerFunc(handleNewAnswer)
            .setHandleNewQuestionFunc(handleNewQuestion)
            .build(),
    };

    // Return the selected page or default to "home" page if `pageName` is invalid
    if (pageBuilders[pageName]) {
        return pageBuilders[pageName]();
    }

    console.warn(`Unknown pageName: "${pageName}", defaulting to HomePage.`);
    return pageBuilders["home"]();
}