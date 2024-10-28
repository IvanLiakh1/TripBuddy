import './events.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import photo from '../../assets/eventsPhoto.png';
import EventCard from '../../component/event/EventCard.jsx';
import Footer from '../../component/footer/footer.jsx';
import Header from '../../component/header/header.jsx';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEvents = async (query = '') => {
        try {
            const response = await axiosInstance.get(`/events/search?q=${query}`);
            const result = response.data;
            console.log(result);
            setEvents(result);
        } catch (error) {
            console.error('Помилка завантаження подій:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents(searchQuery);
    };

    return (
        <>
            <Header />
            <div className="events_page">
                <img src={photo} className="position-center-width" style={{ marginTop: 10 }} alt="events" />
                <div className="position-center-width search-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Пошук подій"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search_input"
                        />
                    </form>
                </div>
                <div className="events-grid">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <EventCard
                                key={event._id}
                                title={event.title}
                                author={event.author.fullName}
                                participants={event.maxParticipants}
                                image={event.image}
                            />
                        ))
                    ) : (
                        <p>Немає подій для відображення.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EventsPage;
