describe('Event Constructor Page', () => {
    const userCredentials = {
        email: '2@gmail.com',
        password: '12345',
    };
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/login', userCredentials).then((response) => {
            window.localStorage.setItem('token', response.body.token);
        });
        cy.visit('/create');
    });

    it('Має побачити форму створення події', () => {
        cy.get('h2.create-event-font').contains('Назва події');
        cy.get('input[name="title"]').should('be.empty');
        cy.get('textarea[name="description"]').should('be.empty');
        cy.get('input[name="startLocation"]').should('be.empty');
        cy.get('input[name="endLocation"]').should('be.empty');
        cy.get('input[name="startDate"]').should('be.empty');
        cy.get('input[name="endDate"]').should('be.empty');
        cy.get('input[name="maxParticipants"]').should('have.value', '2');
        cy.get('input[name="tags"]').should('be.empty');
    });

    it('Має показати помилки валідації', () => {
        cy.get('button').contains('Додати подію').click();
        cy.get('p').contains("Назва події є обов'язковою").should('be.visible');
        cy.get('p').contains("Опис події є обов'язковим").should('be.visible');
        cy.get('p').contains("Початкова точка є обов'язковою").should('be.visible');
        cy.get('p').contains("Кінцева точка є обов'язковою").should('be.visible');
        cy.get('p').contains("Дата початку є обов'язковою").should('be.visible');
        cy.get('p').contains("Дата закінчення є обов'язковою").should('be.visible');
    });

    it('Валідує назву і опис', () => {
        cy.get('input[name="title"]').type('Тест');
        cy.get('textarea[name="description"]').type('Короткий опис');
        cy.get('button').contains('Додати подію').click();
        cy.get('p').contains('Назва події не повинна перевищувати 25 символів').should('not.exist');
        cy.get('p').contains('Кількість символів замала або завелика (10-150)').should('not.exist');

        cy.get('input[name="title"]').type('Це дуже довга назва події, що перевищує 25 символів');
        cy.get('textarea[name="description"]').clear().type('test');

        cy.get('button').contains('Додати подію').click();
        cy.wait(1000);

        cy.get('p').should(($p) => {
            expect($p).to.contain('Назва події не повинна перевищувати 25 символів');
            expect($p).to.contain('Кількість символів замала або завелика (10-150)');

        });
    });
    it('Валідує дату', () => {
        cy.get('input[name="startDate"]').type('2024-11-05');
        cy.get('input[name="endDate"]').type('2024-11-04');
        cy.get('button').contains('Додати подію').click();
        cy.contains('Дата закінчення повинна бути пізніше дати початку').should('be.visible');
    });
    it('Валідує дату', () => {
        cy.get('input[name="startDate"]').type('2024-11-05');
        cy.get('input[name="endDate"]').type('2024-11-04');
        cy.get('button').contains('Додати подію').click();
        cy.contains('Дата закінчення повинна бути пізніше дати початку').should('be.visible');
    });


    it('Має створити подію', () => {
        cy.get('input[name="title"]').type('Назва події');
        cy.get('textarea[name="description"]').type('Це опис події.');
        cy.get('input[name="startLocation"]').type('Місце початку');
        cy.get('input[name="endLocation"]').type('Місце завершення');
        cy.get('input[name="startDate"]').type('2024-12-01');
        cy.get('input[name="endDate"]').type('2024-12-02');
        cy.get('input[name="maxParticipants"]').clear().type('10');
        cy.get('input[name="tags"]').type('тег1, тег2');

        cy.get('button').contains('Додати подію').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('Завантаження зображень', () => {
        const fileName = '5988411.png';
        cy.fixture(fileName).then((fileContent) => {
            cy.get('input[type="file"]').attachFile({
                fileContent,
                fileName,
                mimeType: 'image/jpeg',
            });
        });

        cy.get('img.previewImage').should('have.attr', 'src').and('include', 'data:image/jpeg;base64,');
    });

    it('Має перейти на головну сторінку після скасування', () => {
        cy.get('button').contains('Скасувати').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
        it('should allow the user to upload an event photo', () => {

            cy.get('input[name="title"]').type('Велоподорож до Карпат');
            cy.get('textarea[name="description"]').type('Крута подорож. Бери друзів і погнали.');
            cy.get('input[name="startLocation"]').type('Львів');
            cy.get('input[name="endLocation"]').type('Карпати');
            cy.get('input[name="maxParticipants"]').clear().type('5');
            cy.get('input[name="startDate"]').type('2024-11-05');
            cy.get('input[name="endDate"]').type('2024-11-06');
            cy.fixture('5988411.png', 'base64').then((fileContent) => {
                const base64Image = `data:image/png;base64,${fileContent}`;
                cy.get('input[type="file"]').attachFile({
                    fileContent: fileContent,
                    fileName: '5988411.png',
                    mimeType: 'image/png',
                    encoding: 'base64',
                });
            });
            cy.get('button').contains('Додати подію').click();

        });
});
