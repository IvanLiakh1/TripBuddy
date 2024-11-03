import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from '../../src/component/footer/footer.jsx'; // Перевірте правильність шляху до компонента

describe('Footer', () => {
    it('renders the footer with correct content', () => {
        render(<Footer />);
        const tripBuddyElements = screen.getAllByText(/tripbuddy/i);
        expect(tripBuddyElements.length).to.be.greaterThan(0); // Змінено
        expect(screen.getByText(/знаходь нас/i)).to.exist; // Змінено
        expect(screen.getByText(/підтримка/i)).to.exist; // Змінено
        expect(screen.getByText(/повідомити про баг/i)).to.exist; // Змінено
        expect(screen.getByText(/bugstripbuddy@gmail.com/i)).to.exist; // Змінено
    });
});
