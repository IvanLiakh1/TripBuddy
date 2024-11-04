import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import EventCard from '../../src/component/event/EventCard/EventCard.jsx';

const mockEvent = {
    title: 'Тестова подія',
    author: { fullName: 'Автор Тест' },
    maxParticipants: 10,
    image: null,
};
describe('EventCard Component', () => {
    it('Відображає коректні дані', () => {
        cy.mount(
            <MemoryRouter>
                <EventCard event={mockEvent} />
            </MemoryRouter>,
        );

        cy.contains('Тестова подія').should('be.visible');
        cy.contains('Автор Тест').should('be.visible');
        cy.contains('10').should('be.visible');
    });
    it('Переходить на сторінку події після натискання на неї', () => {
        cy.mount(
            <MemoryRouter>
                <EventCard event={mockEvent} />
            </MemoryRouter>,
        );
        cy.get('.event-card').click();
    });
});
