import './events.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import photo from '../../assets/eventsPhoto.png';
import filter from '../../assets/filter.svg';
import glass from '../../assets/MagnifyingGlass.svg';
import { isAuthOK } from '../../component/auth/verifyJWT.js';
import EventCard from '../../component/event/EventCard.jsx';
import Layout from '../../component/layout.js';
import FilterSidebar from './FilterPopUp.jsx';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [order, setOrder] = useState('asc');
    const [filterBy, setFilterBy] = useState('all');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    const user = isAuthOK();
    const userId = user.id;

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get('/event/search');
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Помилка завантаження подій:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const applyFilters = () => {
        let updatedEvents = [...events];
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            updatedEvents = updatedEvents.filter((event) => regex.test(event.title));
        }
        if (filterBy === 'created') {
            updatedEvents = updatedEvents.filter((event) => event.author._id === userId);
        } else if (filterBy === 'participating') {
            updatedEvents = updatedEvents.filter((event) => event.participants.includes(userId));
        }
        updatedEvents.sort((a, b) => {
            if (sortBy === 'date') {
                return order === 'asc'
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'participantsCount') {
                return order === 'asc'
                    ? a.participants.length - b.participants.length
                    : b.participants.length - a.participants.length;
            }
            return 0;
        });
        setFilteredEvents(updatedEvents);
    };

    useEffect(() => {
        applyFilters();
    }, [searchQuery, sortBy, order, filterBy, events]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="app-container">
            <Layout>
                <div className="events-page position-center-width">
                    <img src={photo} className="" style={{ marginTop: 10 }} alt="events" />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="search-container" style={{ width: 650 }}>
                            <img src={glass} alt="search" />
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    placeholder="Пошук подій"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="search_input"
                                    style={{ width: 650 }}
                                />
                            </form>
                        </div>

                        <button className="filter-button" onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}>
                            <img src={filter} alt="filter" />
                        </button>
                    </div>

                    <div className="events-grid">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
                        ) : (
                            <p>Немає подій для відображення.</p>
                        )}
                    </div>

                    <FilterSidebar
                        isOpen={isFilterPopupOpen}
                        onClose={() => setIsFilterPopupOpen(false)}
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                    />
                </div>
            </Layout>
        </div>
    );
}

export default EventsPage;
