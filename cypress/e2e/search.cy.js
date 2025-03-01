describe('Search 1', () => {
    it('Search string in question text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('navigation{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 2', () => {
    it('Search string matches tag and text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('navigation [React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 3', () => {
    it('Output of the search should be in newest order by default', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('android [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
    });
});

describe('Search 4', () => {
    it('Output of the search should show number of results found', () => {
        const qTitles = ["Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('android [react]{enter}');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 5', () => {
    it('Output of the empty search should show all results ', () => {
        const qTitles = ["Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('{enter}');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 6', () => {
    it('Search string with non-existing tag and non-tag word', () => {
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('[NonExistingTag] nonexistingword{enter}');
        cy.contains('0 questions', { matchCase: false });
    });
});

describe('Search 7', () => {
    it('Search string with case-insensitive matching', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('AnDrOiD{enter}');
        cy.contains('android');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 8', () => {
    it('Search for existing post from Tags page', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:3000');
        cy.contains('Tags').click();
        cy.get('#searchBar').type('AnDrOiD{enter}');
        cy.contains('android');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 9', () => {
    it('Search for existing post after asking a question', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#searchBar').type('[javaScript]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    });
});

describe('Search 10', () => {
    it('Search for absent post after asking a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#searchBar').type('[no tag]{enter}');
        cy.contains('0 Questions', { matchCase: false });
        cy.get('.postTitle').should('not.exist');
    });
});

describe('Search 11', () => {
    it('Search for existing post after viewing questions of a tag', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:3000');
        cy.contains('Tags').click();
        cy.contains('React', { matchCase: false }).click();
        cy.get('#searchBar').type('[Javascript]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        cy.contains(qTitles.length+" questions");
    });
});