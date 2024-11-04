import './modalStyle.css';

import React from 'react';

function ParticipantsModal({ participants, onParticipantClick, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Учасники</h2>
                <button className="close-button" onClick={onClose}>
                    Закрити
                </button>
                <div className="participants-list">
                    {participants.length > 0 ? (
                        participants.map((participant) => (
                            <div
                                key={participant._id || participant}
                                className="participant"
                                onClick={() => onParticipantClick(participant._id)}
                            >
                                <p>{participant?.fullName || 'Учасник'}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-participants">Немає учасників</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParticipantsModal;
