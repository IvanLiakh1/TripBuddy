import '../../src/component/event/PopUp/FilterPopUp.css';
import React from 'react';
import FilterPopup from '../../src/component/event/PopUp/FilterPopUp.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('Компонент FilterPopup', () => {
    let onClose;
    let setFilterBy;
    let setSortBy;
    let setOrder;

    beforeEach(() => {
        // Монтируем компонент перед кожним тестом, без стубів
        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );
    });

    it('повинен закриватися при натисканні на кнопку закриття', () => {
        onClose = cy.stub().as('onClose');
        setFilterBy = cy.stub().as('setFilterBy');
        setSortBy = cy.stub().as('setSortBy');
        setOrder = cy.stub().as('setOrder');

        // Переміщуємо ініціалізацію стубів всередину тесту
        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );

        cy.get('.filter-popup_close-button').click();
        cy.get('@onClose').should('have.been.calledOnce');
    });

    it('має відображати всі опції фільтрації та сортування', () => {
        onClose = cy.stub().as('onClose');
        setFilterBy = cy.stub().as('setFilterBy');
        setSortBy = cy.stub().as('setSortBy');
        setOrder = cy.stub().as('setOrder');

        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );

        cy.contains('Фільтри').should('be.visible');
        cy.contains('Усі події').should('be.visible');
        cy.contains('Мої події').should('be.visible');
        cy.contains('Події, у яких я беру участь').should('be.visible');
        cy.contains('Сортувати за').should('be.visible');
        cy.contains('Дата створення').should('be.visible');
        cy.contains('Кількість учасників').should('be.visible');
        cy.contains('Порядок').should('be.visible');
        cy.contains('За зростанням').should('be.visible');
        cy.contains('За спаданням').should('be.visible');
    });

    it('повинен викликати setFilterBy при виборі різних фільтрів', () => {
        onClose = cy.stub().as('onClose');
        setFilterBy = cy.stub().as('setFilterBy');
        setSortBy = cy.stub().as('setSortBy');
        setOrder = cy.stub().as('setOrder');

        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );

        cy.contains('Мої події').click();
        cy.get('@setFilterBy').should('have.been.calledWith', 'created');

        cy.contains('Події, у яких я беру участь').click();
        cy.get('@setFilterBy').should('have.been.calledWith', 'participating');
    });

    it('повинен викликати setSortBy при виборі сортування', () => {
        onClose = cy.stub().as('onClose');
        setFilterBy = cy.stub().as('setFilterBy');
        setSortBy = cy.stub().as('setSortBy');
        setOrder = cy.stub().as('setOrder');

        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );

        cy.contains('Кількість учасників').click();
        cy.get('@setSortBy').should('have.been.calledWith', 'participantsCount');
    });

    it('повинен викликати setOrder при виборі порядку сортування', () => {
        onClose = cy.stub().as('onClose');
        setFilterBy = cy.stub().as('setFilterBy');
        setSortBy = cy.stub().as('setSortBy');
        setOrder = cy.stub().as('setOrder');

        cy.mount(
            <MemoryRouter>
                <FilterPopup
                    isOpen={true}
                    onClose={onClose}
                    filterBy="all"
                    setFilterBy={setFilterBy}
                    sortBy="date"
                    setSortBy={setSortBy}
                    order="asc"
                    setOrder={setOrder}
                />
            </MemoryRouter>
        );

        cy.contains('За спаданням').click();
        cy.get('@setOrder').should('have.been.calledWith', 'desc');
    });
});
