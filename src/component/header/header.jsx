import './HeaderStyle.css';

import React from 'react';
import { Link } from 'react-router-dom';

import profile from './profileIcon.svg';

function Header() {
    return (
        <div className="header">
            <div className="navbar">
                <p className="logo">TripBuddy</p>
                <Link className="nav-item" to="/">
                    Про нас
                </Link>
                <Link className="nav-item" to="/">
                    Події
                </Link>
                <Link className="nav-item" to="/">
                    Останні
                </Link>
                <Link className="nav-item" to="/">
                    Додати
                </Link>
                <Link className="nav-item" to="/">
                    <img src={profile} className="profile-icon" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
