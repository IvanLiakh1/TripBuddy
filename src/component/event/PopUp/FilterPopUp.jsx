import './FilterPopUp.css';

import React from 'react';

function FilterPopup({ isOpen, onClose, filterBy, setFilterBy, sortBy, setSortBy, order, setOrder }) {
    if (!isOpen) return null;

    return (
        <div className="filter-popup">
            <button onClick={onClose} className="filter-popup_close-button">
                ×
            </button>
            <h3>Фільтри</h3>
            <div className="filter-popup-content">
                <label>
                    <input type="radio" value="all" checked={filterBy === 'all'} onChange={() => setFilterBy('all')} />
                    Усі події
                </label>
                <label>
                    <input
                        type="radio"
                        value="created"
                        checked={filterBy === 'created'}
                        onChange={() => setFilterBy('created')}
                    />
                    Мої події
                </label>
                <label>
                    <input
                        type="radio"
                        value="participating"
                        checked={filterBy === 'participating'}
                        onChange={() => setFilterBy('participating')}
                    />
                    Події, у яких я беру участь
                </label>
            </div>
            <h3>Сортувати за</h3>
            <div className="filter-popup-content">
                <label>
                    <input type="radio" value="date" checked={sortBy === 'date'} onChange={() => setSortBy('date')} />
                    Дата створення
                </label>
                <label>
                    <input
                        type="radio"
                        value="participantsCount"
                        checked={sortBy === 'participantsCount'}
                        onChange={() => setSortBy('participantsCount')}
                    />
                    Кількість учасників
                </label>

                <h3>Порядок</h3>
                <div className="filter-popup-content">
                    <label>
                        <input type="radio" value="asc" checked={order === 'asc'} onChange={() => setOrder('asc')} />
                        За зростанням
                    </label>
                    <label>
                        <input type="radio" value="desc" checked={order === 'desc'} onChange={() => setOrder('desc')} />
                        За спаданням
                    </label>
                </div>
            </div>
        </div>
    );
}

export default FilterPopup;
