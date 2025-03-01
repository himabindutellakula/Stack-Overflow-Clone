import { createNewQuestion, createAnwer, verifyQuestionsList } from '../utils/commons';

const NUMBER_OF_EXISTING_QUESTION = 2;

describe('All questions page should show only the Next button when the page loads with the first five questions', () => {
    const numberOfQuestions = 10;
    const title = 'Sample Question Title';
    const text = 'Sample Question Text';
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        createNewQuestion(numberOfQuestions, title, text);
        cy.contains(`${numberOfQuestions + NUMBER_OF_EXISTING_QUESTION} Questions`, { matchCase: false });
    });

    it('Previous button is not shown', () => {
        cy.get('.next-btn').should('exist');
        cy.get('.prev-btn').should('not.exist');
    });

    it('Previous button is not shown for Active', () => {
        cy.contains('Active').click();
        cy.get('.next-btn').should('exist');
        cy.get('.prev-btn').should('not.exist');
    });

    it('Previous button is not shown for Unanswered', () => {
        cy.contains('Unanswered').click();
        cy.get('.next-btn').should('exist');
        cy.get('.prev-btn').should('not.exist');
    });
});