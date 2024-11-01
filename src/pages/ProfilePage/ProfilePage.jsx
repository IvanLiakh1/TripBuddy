import './profile.css';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import defaultAvatar from '../../assets/profileIcon.svg';
import { isAuthOK, logout } from '../../component/auth/verifyJWT.js';
import Layout from '../../component/layout.js';
import EditProfile from '../../component/user/editProfile.jsx';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const currentUser = isAuthOK();
    const userId = location.state?.userId || currentUser.id;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${userId}`);
                setUserData(response.data);
            } catch (error_) {
                setError(error_.response?.data?.message || 'Помилка при отриманні даних');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);
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
    const isOwnProfile = currentUser.id === userData._id;
    if (!userData) {
        return <p>Користувача не знайдено.</p>;
    }
    return (
        <div className="app-container">
            <Layout>
                <div className="profile-container position-center-width">
                    {isEditing ? (
                        <EditProfile userData={userData} onSave={handleSave} onCancel={handleCancel} />
                    ) : (
                        <>
                            <div className="profile-header">
                                <div>
                                    <img
                                        src={
                                            userData.avatar ? `data:image/png;base64,${userData.avatar}` : defaultAvatar
                                        }
                                        alt="Avatar"
                                        className="avatar"
                                    />
                                </div>
                                <div>
                                    <div className="name-field-profile">
                                        <span>
                                            {userData.fullName}
                                            {userData.dateOfBirth && (
                                                <>
                                                    ,{' '}
                                                    {new Date().getFullYear() -
                                                        new Date(userData.dateOfBirth).getFullYear()}
                                                </>
                                            )}
                                        </span>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
                                            {isOwnProfile && (
                                                <>
                                                    <button className="button-bordered" onClick={handleEditClick}>
                                                        Редагувати профіль
                                                    </button>
                                                    <button
                                                        className="button-bordered"
                                                        style={{
                                                            width: 100,
                                                            marginLeft: 5,
                                                            backgroundColor: '#CDCDCD',
                                                            color: '#2C2C2C',
                                                        }}
                                                        onClick={logout}
                                                    >
                                                        Вийти
                                                    </button>
                                                </>
                                            )}
                                        </div>
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
                                <p style={{ marginBottom: 10, fontSize: 20 }}>
                                    Кількість відвіданих подій: {userData.eventsAttended}
                                </p>
                                <p className="bio">{userData.bio}</p>
                            </div>
                        </>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default ProfilePage;
