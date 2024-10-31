import './eventCard.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import image2 from '../../assets/image 2.png';
import image3 from '../../assets/Participantsimg.svg';

function EventCard({ event }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/event', { state: { event } });
    };
    return (
        <div onClick={handleCardClick} className="event-card" style={{ cursor: 'pointer' }}>
            <div className="eventcard-container">
                <img
                    src={event.image ? `data:image/png;base64,${event.image}` : image2}
                    alt={event.title}
                    className="event-card-image"
                />
                <div className="event-card-content">
                    <h4 style={{ fontWeight: 400 }}>{event.title}</h4>

                    <span className="event-card-author">{event.author?.fullName || 'Невідомий автор'}</span>
                    <div className="participants">
                        <img src={image3} alt="Учасники" />
                        <span>{event.maxParticipants}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
