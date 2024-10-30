import './events.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import photo from '../../assets/eventsPhoto.png';
import filter from '../../assets/filter.svg';
import glass from '../../assets/MagnifyingGlass.svg';
import EventCard from '../../component/event/EventCard.jsx';
import Layout from '../../component/layout.js';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title'); // Тип сортування
    const [order, setOrder] = useState('asc'); // Порядок сортування

    const fetchEvents = async (query = '', sortBy = 'title', order = 'asc') => {
        try {
            const response = await axiosInstance.get(`/event/search?q=${query}&sortBy=${sortBy}&order=${order}`);
            const result = response.data;
            setEvents(result);
        } catch (error) {
            console.error('Помилка завантаження подій:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [sortBy, order]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents(searchQuery, sortBy, order);
    };

    return (
        <div className="app-container">
            <Layout>
                <div className="events-page position-center-width">
                    <img src={photo} className="" style={{ marginTop: 10 }} alt="events" />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="search-container">
                            <img src={glass} />
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
                        <button className="filter-button">
                            <img src={filter} />
                        </button>
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
            </Layout>
        </div>
    );
}

export default EventsPage;
