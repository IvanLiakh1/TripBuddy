import './FilterPopUp.css';

import React from 'react';

function FilterPopup({ isOpen, onClose, filterBy, setFilterBy }) {
    if (!isOpen) return null;

    return (
        <div className="filter-popup">
            <h3 style={{ marginBottom: 10 }}>Фільтри</h3>
            <div className="filter-popup-content">
                <button onClick={onClose} className="filter-popup_close-button">
                    ×
                </button>
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
        </div>
    );
}

export default FilterPopup;
