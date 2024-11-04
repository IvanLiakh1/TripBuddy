import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from '../../src/component/footer/footer.jsx';

describe('Footer', () => {
    it('Відображає футер з коректною інформацією', () => {
        render(<Footer />);
        const tripBuddyElements = screen.getAllByText(/tripbuddy/i);
        expect(tripBuddyElements.length).to.be.greaterThan(0);
        expect(screen.getByText(/знаходь нас/i)).to.exist;
        expect(screen.getByText(/підтримка/i)).to.exist;
        expect(screen.getByText(/повідомити про баг/i)).to.exist;
        expect(screen.getByText(/bugstripbuddy@gmail.com/i)).to.exist;
    });
});
