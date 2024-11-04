describe('Profile Page E2E Tests', () => {
    const userCredentials = {
        email: '2@gmail.com',
        password: '12345',
    };

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/login', userCredentials).then((response) => {
            window.localStorage.setItem('token', response.body.token);
        });
    });

    it('Відображає профіль користувача', () => {
        cy.visit('/profile');
        cy.get('.name-field-profile span').should('contain', "Новий Ім'я");
        cy.get('.bio').should('contain', 'Нова біографія');
        cy.get('.tags').should('contain', 'Теги');
    });

    it('Редагує профіль користувача', () => {
        cy.visit('/profile');

        cy.contains('Редагувати профіль').click();
        cy.get('.edit-profile-container').should('be.visible');

        cy.get('input[name="fullName"]').clear().type("Новий Ім'я");
        cy.get('textarea[name="bio"]').clear().type('Нова біографія');
        cy.get('input[name="tags"]').clear().type('Теги');

        cy.contains('Зберегти').click();

        cy.get('.name-field-profile span').should('contain', "Новий Ім'я");
        cy.get('.bio').should('contain', 'Нова біографія');
        cy.get('.tags').should('contain', 'Теги');
    });
    it("Показує повідомлення про помилки при некоректному введенні даних в поле ім'я", () => {
        cy.visit('/profile');

        cy.contains('Редагувати профіль').click();
        cy.get('.edit-profile-container').should('be.visible');

        cy.get('input[name="fullName"]').clear();
        cy.contains('Зберегти').click();

        cy.get('.error-message').should('contain', "Поле 'Ім'я' не може бути пустим.");
    });
    it('Показує повідомлення про помилки при некоректному введенні даних в поле біографія', () => {
        cy.visit('/profile');

        cy.contains('Редагувати профіль').click();
        cy.get('.edit-profile-container').should('be.visible');
        cy.get('input[name="fullName"]').clear().type('test');
        cy.get('textarea[name="bio"]').clear();
        cy.contains('Зберегти').click();

        cy.get('.error-message').should('contain', "Поле 'Біографія' має невірний формат");
    });
    it('Показує повідомлення про помилки при некоректному введенні даних в поле біографія', () => {
        cy.visit('/profile');

        cy.contains('Редагувати профіль').click();
        cy.get('.edit-profile-container').should('be.visible');
        cy.get('input[name="fullName"]').clear().type('test');
        cy.get('textarea[name="bio"]').clear().type('TEST');
        cy.get('input[name="tags"]').clear();
        cy.contains('Зберегти').click();

        cy.get('.error-message').should('contain', "Поле 'Теги' не може бути пустим.");
    });

    it('Вихід з профілю', () => {
        cy.visit('/profile');

        cy.get('button').contains('Вийти').click();

        cy.url().should('include', '/login');
    });

    it('Скасування редагування профілю', () => {
        cy.visit('/profile');
        cy.contains('Редагувати профіль').click();
        cy.get('button').contains('Скасувати').click();
    });
    it('Змінює фото профілю', () => {
        cy.visit('/profile');
        cy.contains('Редагувати профіль').click();
        cy.get('.edit-profile-container').should('be.visible');
        cy.fixture('5988411.png', 'base64').then((fileContent) => {
            const base64Image = `data:image/png;base64,${fileContent}`;

            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent,
                fileName: '5988411.png',
                mimeType: 'image/png',
                encoding: 'base64',
            });
            cy.contains('Зберегти').click();
            cy.get('.avatar').should('have.attr', 'src', base64Image);
        });
    });
    it('Користувача не знайдено', () => {
        cy.visit('/profile');
        cy.contains('Користувача не знайдено').should('be.visible');
    });
    it('Помилка при отриманні даних', () => {
        cy.visit('/profile');
        cy.contains('Помилка при отриманні даних').should('be.visible');
    });
    it('Має перекинути на сторінку авторизації', () => {
        cy.wait(3000);
        cy.url().should('include', '/login');
    });
});
