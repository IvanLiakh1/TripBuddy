import React from 'react';

import FilterPopup from '../../src/component/event/PopUp/FilterPopUp.jsx';

describe('Компонент FilterPopup', () => {
    const onClose = cy.stub().as('onClose');
    const setFilterBy = cy.stub().as('setFilterBy');
    const setSortBy = cy.stub().as('setSortBy');
    const setOrder = cy.stub().as('setOrder');

    beforeEach(() => {
        cy.mount(
            <FilterPopup
                isOpen={true}
                onClose={onClose}
                filterBy="all"
                setFilterBy={setFilterBy}
                sortBy="date"
                setSortBy={setSortBy}
                order="asc"
                setOrder={setOrder}
            />,
        );
    });

    it('має відображати всі опції фільтрації та сортування', () => {
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

    it('повинен закриватися при натисканні на кнопку закриття', () => {
        cy.get('.filter-popup_close-button').click();
        cy.get('@onClose').should('have.been.calledOnce');
    });

    it('повинен викликати setFilterBy при виборі різних фільтрів', () => {
        cy.contains('Мої події').click();
        cy.get('@setFilterBy').should('have.been.calledWith', 'created');

        cy.contains('Події, у яких я беру участь').click();
        cy.get('@setFilterBy').should('have.been.calledWith', 'participating');
    });

    it('повинен викликати setSortBy при виборі сортування', () => {
        cy.contains('Кількість учасників').click();
        cy.get('@setSortBy').should('have.been.calledWith', 'participantsCount');
    });

    it('повинен викликати setOrder при виборі порядку сортування', () => {
        cy.contains('За спаданням').click();
        cy.get('@setOrder').should('have.been.calledWith', 'desc');
    });
});
