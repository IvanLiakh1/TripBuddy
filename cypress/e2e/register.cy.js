describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('Має відобразити форму реєстрації', () => {
        cy.get('h2').should('contain', 'Реєстрація');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('input[type="text"]').should('be.visible');
        cy.get('input[type="date"]').should('be.visible');
        cy.get('button[type="submit"]').should('contain', 'Зареєструватися');
    });

    it('Має зареєструвати користувача', () => {
        cy.intercept('POST', 'http://localhost:3000/api/register', {
            statusCode: 200,
            body: {
                message: 'Реєстрація успішна',
            },
        }).as('registerRequest');

        cy.get('input[type="text"]').type("Тестове Ім'я");
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('input[type="date"]').type('1990-01-01');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);
        cy.url().should('eq', 'http://localhost:8080/login');
    });

    it('Має відобразити повідомлення про те що користувач вже існує', () => {
        cy.intercept('POST', 'http://localhost:3000/api/register', {
            statusCode: 409,
            body: {
                error: 'Користувач вже існує.',
            },
        }).as('registerRequest');

        cy.get('input[type="text"]').type("Тестове Ім'я");
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('input[type="date"]').type('1990-01-01');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerRequest').its('response.statusCode').should('eq', 409);
        cy.get('.error-message').should('contain', 'Користувач вже існує');
    });
});
