import { createNewQuestion, verifyQuestionsList } from '../utils/commons';

const NUMBER_OF_EXISTING_QUESTION = 2;

describe('Search by tag should display five questions with the tag at a time and not other questions', () => {
    const numberOfQuestions = 24;
    const title = 'Sample Question Title';
    const text = 'Sample Question Text';
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        createNewQuestion(numberOfQuestions, title, text);
        cy.contains(`${numberOfQuestions + NUMBER_OF_EXISTING_QUESTION} Questions`, { matchCase: false });
    });

    it('Search by tag should display first five questions with the tag intially', () => {
        cy.get('#searchBar').type('[javascript]{enter}');
        cy.contains('7 questions', { matchCase: false });
        cy.get('.prev-btn').should('not.exist');
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Search by tag should display second five questions with the tag when next is clicked once', () => {
        cy.get('#searchBar').type('[javascript]{enter}');
        cy.get('.next-btn').click();
        cy.contains('7 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        expectedQuestionsList.push('android studio save string shared preference, start activity and load the saved string');
        expectedQuestionsList.push('Programmatically navigate using React router');
        expect(expectedQuestionsList.length).to.equal(2);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Search by tag should display first five questions with the tag when next is pressed and then prev', () => {
        cy.get('#searchBar').type('[javascript]{enter}');
        cy.get('.next-btn').click();
        cy.get('.prev-btn').click();
        cy.contains('7 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Search by tag should display first five questions with the tag when next is pressed twice', () => {
        cy.get('#searchBar').type('[javascript]{enter}');
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.get('.prev-btn').should('not.exist');
        cy.contains('7 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 0; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });
});