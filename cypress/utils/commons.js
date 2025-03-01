export const createNewQuestion = (numberOfQuestions, title, text) => {
    const tags = ['javascript', 'react', 'android', 'android-stuido', 'shared-preferences'];
    const users = ['jojoba', 'tituba', 'sarah', 'juni'];

    for (let i = 0; i < numberOfQuestions; i++) {
        let suffix = i + 1;
        let tagsIndex = i % tags.length;
        let usersIndex = i % users.length;
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type(title + suffix);
        cy.get('#formTextInput').type(text + suffix);
        cy.get('#formTagInput').type(tags[tagsIndex]);
        cy.get('#formUsernameInput').type(users[usersIndex]);
        cy.contains('Post Question').click();
    }
}

export const verifyQuestionsList = (actualQuestionsList, expectedQuestionsList) => {
    actualQuestionsList.should('have.length', expectedQuestionsList.length);
    actualQuestionsList.each(($el, index, _) => {
        cy.wrap($el).should('contain', expectedQuestionsList[index]);
    });
}

export const createAnwer = (questionTitle, answerText) => {
    cy.contains(questionTitle).click();
    cy.contains('Answer Question').click();
    cy.get('#answerUsernameInput').type('joym');
    cy.get('#answerTextInput').type(answerText);
    cy.contains('Post Answer').click();
    cy.contains(answerText);
}