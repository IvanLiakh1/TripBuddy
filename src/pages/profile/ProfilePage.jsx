import './profile.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import defaultAvatar from '../../assets/profileIcon.svg';
import { isAuthOK } from '../../component/auth/verifyJWT.js';
import Footer from '../../component/footer/footer.jsx';
import Header from '../../component/header/header.jsx';
import EditProfile from '../../component/user/editProfile.jsx';

const user = isAuthOK();
const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUserData) => {
        setUserData(updatedUserData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
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
                {isEditing ? (
                    <EditProfile userData={userData} onSave={handleSave} onCancel={handleCancel} />
                ) : (
                    <>
                        <div className="profile-header">
                            <div>
                                <img
                                    src={userData.avatar ? `data:image/png;base64,${userData.avatar}` : defaultAvatar}
                                    alt="Avatar"
                                    className="avatar"
                                />
                            </div>
                            <div>
                                <div className="name-field-profile">
                                    <h2>
                                        {userData.fullName}
                                        {userData.dateOfBirth && (
                                            <>
                                                ,{' '}
                                                {new Date().getFullYear() -
                                                    new Date(userData.dateOfBirth).getFullYear()}
                                            </>
                                        )}
                                    </h2>
                                    <button className="edit-profile-button tags" onClick={handleEditClick}>
                                        Редагувати профіль
                                    </button>
                                </div>
                                {userData.tags.length > 0
                                    ? userData.tags.map((tag, index) => (
                                          <span key={index} className="tags">
                                              {tag}
                                          </span>
                                      ))
                                    : null}
                            </div>
                        </div>
                        <div className="profile-body" style={{ marginLeft: 5 }}>
                            <p style={{ marginBottom: 10 }}>Кількість відвіданих подій: {userData.eventsAttended}</p>
                            <p className="">{userData.bio}</p>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;
