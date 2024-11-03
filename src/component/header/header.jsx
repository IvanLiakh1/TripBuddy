import './HeaderStyle.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { isAuthOK } from '../auth/verifyJWT.jsx';
import profile from './profileIcon.svg';

const user = isAuthOK();
function Header() {
    return (
        <div className="header">
            <div className="navbar">
                <p className="logo">TripBuddy</p>
                <Link className="nav-item" to="/">
                    Про нас
                </Link>
                <Link className="nav-item" to="/events">
                    Події
                </Link>
                <Link className="nav-item" to="/events?sortBy=updatedAt&order=desc">
                    Останні
                </Link>
                <Link className="nav-item" to="/create">
                    Додати
                </Link>
                <Link className="nav-item" to={`/profile`}>
                    <img src={profile} className="profile-icon" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
