describe('Events Page E2E', () => {
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
    it('Не перезавантажує сторінку при надсиланні форми пошуку', () => {
        cy.visit('/events');
        cy.get('.search_input').type('Test Event');
        cy.get('.search-container form').submit();
        cy.url().should('not.include', '?');
    });
    it('Повинна коректно завантажувати події', () => {
        cy.get('.events-grid').should('exist');
        cy.get('.events-grid').children().should('have.length.greaterThan', 0);
    });
    it('Закриває фільтр при натисканні на кнопку', () => {
        cy.visit('/events');
        cy.get('.filter-button').click();
        cy.get('.filter-popup').should('be.visible');
        cy.get('.filter-popup_close-button').click();
        cy.get('.filter-popup').should('not.be.visible');
    });

    it('повинна фільтрувати події за запитом пошуку', () => {
        const searchTerm = 'Тестова подія';
        cy.get('.search_input').type(searchTerm);
        cy.get('.events-grid').children().should('have.length.greaterThan', 0);

        cy.get('.events-grid')
            .children()
            .each(($event) => {
                cy.wrap($event).contains(searchTerm).should('exist');
            });
    });
    it('Пошук неіснуючої події', () => {
        const searchTerm = '0';
        cy.get('.search_input').type(searchTerm);
        cy.get('.events-grid').children().should('have.length', 1);
        cy.contains('Немає подій для відображення.').should('exist');
    });



});
