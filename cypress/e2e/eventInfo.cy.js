describe('Event Search and Details', () => {
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

    it('Має перейти на сторінку події', () => {
        cy.get('.event-card').first().click();
        cy.url().should('include', '/event');
        cy.get('p').should('be.visible').and('contain', 'Назва події');
        cy.get('.description').should('be.visible').and('contain', 'Це опис події.');
    });
    it('Має взяти участь', () => {
        cy.get('.event-card').first().click();
        cy.get('.button-bordered').contains('Взяти участь').should('be.visible');
        cy.get('.participants p').then(($participants) => {
            const initialCount = Number.parseInt($participants.text().split('/')[0]);
            cy.get('.button-bordered').contains('Взяти участь').click();
            cy.get('.participants p').should('contain', `${initialCount + 1}/`);
        });
        cy.get('.button-bordered').contains('Покинути зустріч').should('be.visible');
        cy.get('.participants p').then(($participants) => {
            const initialCount = Number.parseInt($participants.text().split('/')[0]);
            cy.get('.button-bordered').contains('Покинути зустріч').click();
            cy.get('.participants p').should('contain', `${initialCount - 1}/`);
        });
    });
    it('Має перейти на профіль автора', () => {
        cy.get('.event-card').first().click();
        cy.get('.event-card-author').click();
        cy.url().should('include', '/profile');
    });
    it('Має відобразити кількість учасників', () => {
        cy.get('.event-card').first().click();
        cy.get('.participants').contains('1/10').click();
        cy.get('h2').contains('Учасники').should('be.visible');
    });
    it('Має перейти на профіль учасника', () => {
        cy.get('.event-card').first().click();
        cy.get('.participants').contains('1/10').click();
        cy.get('h2').contains('Учасники').should('be.visible');
        cy.get('.participant').contains('Іван').click();
        cy.url().should('include', '/profile');

    });
    it('Має закрити модальне вікно', () => {
        cy.get('.event-card').first().click();
        cy.get('.participants').contains('1/10').click();
        cy.get('h2').contains('Учасники').should('be.visible');
        cy.get('.close-button').click();
    });
});
