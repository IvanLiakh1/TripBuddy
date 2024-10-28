import './profile.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import defaultAvatar from '../../assets/profileIcon.svg';
import { isAuthOK } from '../../component/auth/verifyJWT.js';
import Footer from '../../component/footer/footer.jsx';
import Header from '../../component/header/header.jsx';

const user = isAuthOK();
const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${user.id}`);
                setUserData(response.data);
            } catch (error_) {
                setError(error_.response?.data?.message || 'Помилка при отриманні даних');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);
    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!userData) {
        return <p>Користувача не знайдено.</p>;
    }
    return (
        <>
            <Header />
            <div className="profile-container position-center-width">
                <div className="profile-header">
                    <div>
                        <img src={userData.avatar || defaultAvatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                        <h2>
                            {userData.fullName}
                            {userData.dateOfBirth && (
                                <>, {new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear()}</>
                            )}
                        </h2>
                        {userData.tags.length > 0 ? (
                            userData.tags.map((tag, index) => (
                                <span key={index} className="tags">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <p>Немає подій для відображення.</p>
                        )}
                    </div>
                </div>
                <div style={{ marginLeft: 5 }}>
                    <div className="events-count">Кількість відвіданих подій: {userData.eventsAttended}</div>
                    <p style={{ marginTop: 10 }}>{userData.bio}</p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;
