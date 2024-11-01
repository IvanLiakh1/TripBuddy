import '../events.css';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import axiosInstance from '../../../../server/axios/axiosInstance.js';
import photo from '../../../assets/eventsPhoto.jpg';
import filter from '../../../assets/filter.svg';
import glass from '../../../assets/MagnifyingGlass.svg';
import { isAuthOK } from '../../../component/auth/verifyJWT.js';
import EventCard from '../../../component/event/EventCard/EventCard.jsx';
import FilterPopup from '../../../component/event/PopUp/FilterPopUp.jsx';
import Layout from '../../../component/layout.js';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortByFromQuery = queryParams.get('sortBy') || 'participantsCount';
    const orderFromQuery = queryParams.get('order') || 'asc';
    const [sortBy, setSortBy] = useState(sortByFromQuery);
    const [order, setOrder] = useState(orderFromQuery);

    const user = isAuthOK();
    const userId = user.id;

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get(`/event/search?sortBy=${sortBy}&order=${order}`);
            console.log(response.data);
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Помилка завантаження подій:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [sortBy, order]);

    const applyFilters = () => {
        let updatedEvents = [...events];
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            updatedEvents = updatedEvents.filter((event) => {
                const matchesTitle = regex.test(event.title);
                const matchesTags = event.tags.some((tag) => regex.test(tag));
                return matchesTitle || matchesTags;
            });
        }
        if (filterBy === 'created') {
            updatedEvents = updatedEvents.filter((event) => event.author._id === userId);
        } else if (filterBy === 'participating') {
            updatedEvents = updatedEvents.filter((event) => event.participants.includes(userId));
        }

        updatedEvents.sort((a, b) => {
            if (sortBy === 'date' || sortBy === 'updatedAt') {
                return order === 'asc'
                    ? new Date(a[sortBy]) - new Date(b[sortBy])
                    : new Date(b[sortBy]) - new Date(a[sortBy]);
            } else if (sortBy === 'participantsCount') {
                return order === 'asc' ? a.maxParticipants - b.maxParticipants : b.maxParticipants - a.maxParticipants;
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
                    <img src={photo} className="evens-page-landing-photo" alt="events" />
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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

                    <FilterPopup
                        isOpen={isFilterPopupOpen}
                        onClose={() => setIsFilterPopupOpen(false)}
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        order={order}
                        setOrder={setOrder}
                    />
                </div>
            </Layout>
        </div>
    );
}

export default EventsPage;
