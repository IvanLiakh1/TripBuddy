import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import defImage from '../../assets/image 2.png';
import line from '../../assets/Line.svg';
import map from '../../assets/Map.svg';
import participants from '../../assets/Participantsimg.svg';
import { AuthContext } from '../../component/auth/verifyJWT.js';
import Layout from '../../component/layout.js';
import ParticipantsModal from './ParticipantsModal.jsx';

function EventInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const user = useContext(AuthContext);
    const [showParticipants, setShowParticipants] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    const fetchEventDetails = async () => {
        const eventId = location.state?.event?._id;
        if (!eventId) {
            console.error('ID події не знайдено');
            return;
        }
        try {
            const response = await axiosInstance.get(`/event/${eventId}`);
            console.log(response.data);
            setEvent(response.data);
            const isParticipant = response.data.participants.some((participant) => participant._id === user.id);
            console.log(user.id);
            setIsParticipant(isParticipant);
        } catch (error) {
            console.error('Помилка завантаження деталей події:', error);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [user.id, location.state]);

    const handleParticipate = async () => {
        try {
            const response = await axiosInstance.put(`/event/${event._id}/participate`, { userId: user.id });
            setEvent((prevEvent) => ({
                ...prevEvent,
                participants: response.data.participants,
            }));
            fetchEventDetails();
        } catch (error) {
            console.error('Помилка при додаванні до учасників:', error);
        }
    };

    const handleLeave = async () => {
        if (!event?._id) return;
        try {
            const response = await axiosInstance.put(`/event/${event._id}/leave`, { userId: user.id });
            setEvent((prevEvent) => ({
                ...prevEvent,
                participants: response.data.participants,
            }));
            fetchEventDetails();
            alert('Ви покинули подію!');
        } catch (error) {
            console.error('Помилка при виході з події:', error);
        }
    };

    const handleNavigateToProfile = (userId) => {
        navigate(`/profile`, { state: { userId } });
    };

    function formatDate(sDate) {
        const date = new Date(sDate);
        const months = [
            'січня',
            'лютого',
            'березня',
            'квітня',
            'травня',
            'червня',
            'липня',
            'серпня',
            'вересня',
            'жовтня',
            'листопада',
            'грудня',
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    if (!event || !user) return <p>Завантаження...</p>;
    const currentDate = new Date();
    const isAuthor = event.author?._id === user.id;
    let isFull = event.participants === event.maxParticipants;
    if (event.startDate < currentDate) isFull = true;
    return (
        <div className="app-container">
            <Layout>
                <div className="profile-container position-center-width">
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 25 }}>
                        <img
                            src={event.image ? `data:image/png;base64,${event.image}` : defImage}
                            alt="Avatar"
                            className="event-image"
                        />
                        <div style={{ marginLeft: 25, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div className="event-title-button-container">
                                <p style={{ fontSize: 30 }}>{event.title}</p>
                                {isFull &&
                                    !isAuthor &&
                                    (isParticipant ? (
                                        <button
                                            className="button-bordered"
                                            style={{ fontSize: 15 }}
                                            onClick={() => handleLeave()}
                                        >
                                            Покинути зустріч
                                        </button>
                                    ) : (
                                        <button
                                            className="button-bordered"
                                            style={{ fontSize: 15 }}
                                            onClick={() => handleParticipate()}
                                        >
                                            Взяти участь
                                        </button>
                                    ))}
                            </div>
                            <span
                                className="event-card-author"
                                style={{ fontSize: 24, cursor: 'pointer' }}
                                onClick={() => handleNavigateToProfile(event.author?._id)}
                            >
                                {event.author?.fullName}
                            </span>
                            <div className="participants">
                                <img src={participants} style={{ width: 28 }} />
                                <p
                                    style={{ fontSize: 18, marginLeft: 3, cursor: 'pointer' }}
                                    onClick={() => setShowParticipants(true)}
                                >
                                    {`${event.participants.length}/${event.maxParticipants}`}
                                </p>
                            </div>
                            <div className="row-gap-align">
                                <span className="date"> {formatDate(event.startDate)}</span>
                                <img src={line} />
                                <span className="date"> {formatDate(event.endDate)}</span>
                            </div>
                            <div className="row-gap-align" style={{ fontSize: 20, fontWeight: 200 }}>
                                <img src={map} />
                                <span>{event.startLocation}</span>
                                <img src={line} />
                                <span>{event.endLocation}</span>
                            </div>
                        </div>
                    </div>
                    <span className="description">{event.description}</span>
                    {showParticipants && (
                        <ParticipantsModal
                            participants={event.participants}
                            onParticipantClick={handleNavigateToProfile}
                            onClose={() => setShowParticipants(false)}
                        />
                    )}
                </div>
            </Layout>
        </div>
    );
}

export default EventInfo;
