import { createNewQuestion, createAnwer, verifyQuestionsList } from '../utils/commons';

const NUMBER_OF_EXISTING_QUESTION = 2;

describe('All questions page should display five questions at a time in Newest order', () => {
    const numberOfQuestions = 10;
    const title = 'Sample Question Title';
    const text = 'Sample Question Text';
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        createNewQuestion(numberOfQuestions, title, text);
        cy.contains(`${numberOfQuestions + NUMBER_OF_EXISTING_QUESTION} Questions`, { matchCase: false });
    });

    it('First newest 5 are shown when page loads for the first time', () => {
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < 5; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('First newest 5 are shown when a new question is created from the second page', () => {
        cy.get('.next-btn').click();
        createNewQuestion(1, 'Quick question about cypress', 'how do I check for a string in Cypress');
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = ['Quick question about cypress1'];
        for (let i = 0; i < 4; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Second newest 5 are shown when next is clicked once', () => {
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 5; i < 10; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Third newest 5 are shown when next is clicked twice', () => {
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Second newest 5 are shown when next is clicked twice followed by previous', () => {
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.prev-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 5; i < 10; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('First newest 5 are shown when next and previous are clicked the same number of times', () => {
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.prev-btn').click();
        cy.get('.prev-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < 5; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Wraps around to first newest 5 when next is clicked from the last newest 5', () => {
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < 5; i++) {
            expectedQuestionsList.push(title + (numberOfQuestions - i));
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });
});