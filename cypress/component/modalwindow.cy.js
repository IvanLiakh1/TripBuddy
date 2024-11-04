import React from 'react';

import ParticipantsModal from '../../src/component/event/ModalWindow/ParticipantsModal.jsx';

describe('ParticipantsModal Component', () => {
    const participants = [
        { _id: '1', fullName: 'Учасник 1' },
        { _id: '2', fullName: 'Учасник 2' },
    ];

    it('Рендер нормальний коли учасники є', () => {
        cy.mount(<ParticipantsModal participants={participants} onParticipantClick={() => {}} onClose={() => {}} />);

        cy.contains('Учасники').should('be.visible');
        cy.contains('Учасник 1').should('be.visible');
        cy.contains('Учасник 2').should('be.visible');
    });

    it('Рендер нормальний коли їх немає', () => {
        cy.mount(<ParticipantsModal participants={[]} onParticipantClick={() => {}} onClose={() => {}} />);

        cy.contains('Немає учасників').should('be.visible');
    });

    it('Викликається on close коли натиснуто', () => {
        const onCloseSpy = cy.spy();
        cy.mount(<ParticipantsModal participants={participants} onParticipantClick={() => {}} onClose={onCloseSpy} />);

        cy.contains('Закрити').click();
        cy.wrap(onCloseSpy).should('have.been.called');
    });

    it('Викликається onParticipantClickSpy коли натиснуто', () => {
        const onParticipantClickSpy = cy.spy();
        cy.mount(
            <ParticipantsModal
                participants={participants}
                onParticipantClick={onParticipantClickSpy}
                onClose={() => {}}
            />,
        );

        cy.contains('Учасник 1').click();
        cy.wrap(onParticipantClickSpy).should('have.been.calledWith', '1');
    });

    it('Вікно закривається коли натиснуто', () => {
        const onCloseSpy = cy.spy();
        cy.mount(<ParticipantsModal participants={participants} onParticipantClick={() => {}} onClose={onCloseSpy} />);

        cy.get('.modal-overlay').click({ force: true });
        cy.wrap(onCloseSpy).should('have.been.called');
    });
});
