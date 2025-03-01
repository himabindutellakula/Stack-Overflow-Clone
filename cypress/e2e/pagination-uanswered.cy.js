import { createNewQuestion, createAnwer, verifyQuestionsList } from '../utils/commons';

const NUMBER_OF_EXISTING_QUESTION = 2;

describe('All questions page should display all unasnwered questions five at a time in Unanswered order', () => {
    const numberOfQuestions = 10;
    const title = 'Sample Question Title';
    const text = 'Sample Question Text';
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        createNewQuestion(numberOfQuestions, title, text);
        cy.contains(`${numberOfQuestions + NUMBER_OF_EXISTING_QUESTION} Questions`, { matchCase: false });
    });

    it('First unanswered 5 are shown when page loads for the first time', () => {
        cy.contains('Unanswered').click();
        cy.contains('10 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < 5; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Second unanswered 5 are shown when next is clicked once', () => {
        cy.contains('Unanswered').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 5; i < 10; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Wraps around to first 5 are shown when next is clicked twice', () => {
        cy.contains('Unanswered').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < 5; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });
});