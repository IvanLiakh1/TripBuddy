describe('FilterPopup', () => {
    const userCredentials = {
        email: '2@gmail.com',
        password: '12345',
    };
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/login', userCredentials).then((response) => {
            window.localStorage.setItem('token', response.body.token);
        });
        cy.visit('/events');
    });

    it('Має відображати меню фільтра', () => {
        cy.get('button.filter-button').click();
        cy.get('.filter-popup').should('be.visible');
        cy.contains('Фільтри').should('exist');
    });

    it('Має закрити меню фільтра коли натиснуто кнопку', () => {
        cy.get('button.filter-button').click();
        cy.get('.filter-popup_close-button').click();
        cy.get('.filter-popup').should('not.be.visible');
    });

    it('Має змінити фільтр коли опція radiobutton обрана', () => {
        cy.get('button.filter-button').click();
        cy.get('input[value="created"]').check();
        cy.get('input[value="created"]').should('be.checked');
    });

    it('Має змінити тип фільтрації', () => {
        cy.get('button.filter-button').click();

        cy.get('input[value="participantsCount"]').check();
        cy.get('input[value="participantsCount"]').should('be.checked');
    });

    it('Має змінити тип сортування ', () => {
        cy.get('button.filter-button').click();

        cy.get('input[value="desc"]').check();
        cy.get('input[value="desc"]').should('be.checked');
    });
});
