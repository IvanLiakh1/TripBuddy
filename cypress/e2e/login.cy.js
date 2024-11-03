describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('localhost:8080/login');
    });

    it('should display the login form', () => {
        cy.get('h2').should('contain', 'Авторизація');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('contain', 'Увійти');
    });

    it('should login successfully with valid credentials', () => {
        cy.intercept('POST', 'http://localhost:3000/api/login', {
            statusCode: 200,
            body: {
                message: 'Успішний вхід',
                token: 'mocked_token',
            },
        }).as('loginRequest');

        cy.get('input[type="email"]').type('2@gmail.com');
        cy.get('input[type="password"]').type('12345');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
        cy.window().then((win) => {
            win.localStorage.setItem('token', 'mocked_token');
            expect(win.localStorage.getItem('token')).to.equal('mocked_token');
        });
        cy.location('pathname').should('eq', '/');
    });

    it('should display error message for invalid credentials', () => {
        cy.intercept('POST', 'http://localhost:3000/api/login', {
            statusCode: 401,
            body: {
                message: 'Невірні облікові дані',
            },
        }).as('loginRequest');

        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        cy.get('p').should('contain', 'Невірні облікові дані');
    });
    it('Має перейти на сторінку реєстрації', () => {
        cy.get('a[href="/register"]').click();
        cy.location('pathname').should('eq', '/register');
    });
});
