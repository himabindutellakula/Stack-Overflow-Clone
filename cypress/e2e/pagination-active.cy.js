import { createNewQuestion, createAnwer, verifyQuestionsList } from '../utils/commons';

const NUMBER_OF_EXISTING_QUESTION = 2;

describe('All questions page should display five questions at a time in Active order', () => {
    const numberOfQuestions = 10;
    const title = 'Sample Question Title';
    const text = 'Sample Question Text';
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        createNewQuestion(numberOfQuestions, title, text);
        cy.contains(`${numberOfQuestions + NUMBER_OF_EXISTING_QUESTION} Questions`, { matchCase: false });
    });

    it('First active 5 are shown when page loads for the first time', () => {
        cy.contains('Active').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        for (let i = 0; i < 3; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Second active 5 are shown when next is clicked once', () => {
        cy.contains('Active').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 3; i < 8; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Third active 5 are shown when next is clicked twice', () => {
        cy.contains('Active').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 8; i < 10; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Unanswered question is shown at the top when it is answered', () => {
        const questionToAnswer = 'Sample Question Title7';
        const answerText = 'Sample Answer Text';
        createAnwer(questionToAnswer, answerText);
        cy.contains('Questions').click();
        cy.contains('Active').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = ['Sample Question Title7', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        for (let i = 0; i < 2; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Wraps around to first active 5 when next is clicked from last active 5', () => {
        cy.contains('Active').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        for (let i = 0; i < 3; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Second active 5 are shown when next is clicked twice followed by prev', () => {
        cy.contains('Active').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.prev-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 3; i < 8; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });
});