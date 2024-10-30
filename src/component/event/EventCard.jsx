import './eventCard.css';

import React from 'react';

import image2 from '../../assets/image 2.png';
import image3 from '../../assets/Participantsimg.svg';
import defaultAvatar from '../../assets/profileIcon.svg';

function EventCard({ title, author, participants, image }) {
    return (
        <div className="eventcard-container">
            <img src={image ? `data:image/png;base64,${image}` : image2} alt={title} className="event-card-image" />
            <div className="event-card-content">
                <h4 style={{ fontWeight: 400 }}>{title}</h4>
                <span className="event-card-author">{author}</span>
                <div className="participants">
                    <img src={image3} alt="Учасники" />
                    <span className="event-card-participants">{participants}</span>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
