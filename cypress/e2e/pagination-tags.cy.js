import { createNewQuestion, verifyQuestionsList } from "../utils/commons";

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

    it('Press react tags shows the first five questions with react tag in newest order', () => {
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('6 questions', { matchCase: false });
        cy.get('.prev-btn').should('not.exist');
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 1; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Next button always shows the next five questions with react tag when react tag is selected and wraps around from the last five to the first five when next is pressed', () => {
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.should('not.exist', '.prev-btn');
        cy.get('.next-btn').click();
        cy.contains('6 questions', { matchCase: false });
        cy.get('.postTitle').should('have.length', 1);
        cy.get('.prev-btn').should('exist');
        cy.get('.next-btn').click();
        cy.get('.postTitle').should('have.length', 5);
        cy.contains('6 questions', { matchCase: false });
    });

    it('Pressing previous after selecting react tag questions shows the previous five questions with react tag in newest order', () => {
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.get('.next-btn').click();
        cy.get('.prev-btn').click();
        cy.contains('6 questions', { matchCase: false });
        cy.get('.postTitle').should('have.length', 5);
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 1; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });


    it('Press react tags shows the first five questions with react tag in active order', () => {
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Active').click();
        cy.contains('6 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 6; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expectedQuestionsList.unshift('Programmatically navigate using React router')
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });

    it('Shows only unanswered react questions when unanswered is selected as order', () => {
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Unanswered').click();
        cy.get('.next-btn').click();
        cy.get('.next-btn').click();
        cy.contains('5 questions', { matchCase: false });
        const actualQuestionsList = cy.get('.postTitle');
        const expectedQuestionsList = [];
        for (let i = 1; i < numberOfQuestions; i = i + 5) {
            const suffix = i + 1;
            expectedQuestionsList.unshift(title + suffix);
        }
        expect(expectedQuestionsList.length).to.equal(5);
        verifyQuestionsList(actualQuestionsList, expectedQuestionsList);
    });
});