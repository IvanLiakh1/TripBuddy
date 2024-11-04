describe('Events Page', () => {
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

    it('Має відкрити список фільтрів та вибрати їх', () => {
        cy.get('.filter-button').click();
        cy.get('.filter-popup').should('be.visible');

        cy.get('input[value="all"]').check();
        cy.get('input[value="all"]').should('be.checked');

        cy.get('input[value="created"]').check();
        cy.get('input[value="created"]').should('be.checked');

        cy.get('input[value="participating"]').check();
        cy.get('input[value="participating"]').should('be.checked');

        cy.get('input[value="date"]').check();
        cy.get('input[value="date"]').should('be.checked');

        cy.get('input[value="desc"]').check();
        cy.get('input[value="desc"]').should('be.checked');

        cy.get('input[value="asc"]').check();
        cy.get('input[value="asc"]').should('be.checked');

        cy.get('input[value="participantsCount"]').check();
        cy.get('input[value="participantsCount"]').should('be.checked');

        cy.get('.filter-popup_close-button').click();
        cy.get('.filter-popup').should('not.exist');
    });

    it('Має фільтрувати список за введеною назвою', () => {
        cy.get('.search_input').type('Назва');
        cy.get('.events-grid').within(() => {
            cy.contains('Назва події').should('exist');
            cy.contains('Non-existent Event').should('not.exist');
        });
    });

    it('Має застовувати фільтри та сортування коректно', () => {
        cy.get('.filter-button').click();
        cy.get('input[value="created"]').check();
        cy.get('input[value="date"]').check();
        cy.get('input[value="desc"]').check();
        cy.get('.filter-popup_close-button').click();
        cy.get('.events-grid').within(() => {
            cy.contains('Назва події').should('exist');
        });
    });

});
