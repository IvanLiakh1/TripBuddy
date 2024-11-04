import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../../src/pages/HomePage/HomePage.jsx';

describe('HomePage Component', () => {
    it('Відображає коректну інформацію', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>,
        );
        const tripBuddyElements = screen.getAllByText(/tripbuddy/i);
        expect(tripBuddyElements.length).to.be.above(0);
        expect(screen.getByText(/необмежена кількість варіантів проведення часу/i)).to.exist;
        expect(screen.getByAltText(/велосипед/i)).to.exist;
        expect(screen.getByAltText(/фото/i)).to.exist;
    });
});
