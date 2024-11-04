import React, { useState } from 'react';

import axiosInstance from '../../../server/axios/axiosInstance.js';

const EditProfile = ({ userData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        fullName: userData.fullName || '',
        bio: userData.bio || '',
        dateOfBirth: userData.dateOfBirth || '',
        tags: userData.tags || '',
        avatar: userData.avatar || '',
    });

    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateFormData = () => {
        if (!formData.fullName || formData.fullName.length >= 25) {
            return "Поле 'Ім'я' не може бути пустим.";
        }
        if (!formData.bio || formData.bio.size > 200) {
            return "Поле 'Біографія' має невірний формат";
        }
        if (!formData.tags || formData.tags.length >= 30) {
            return "Поле 'Теги' не може бути пустим.";
        }
        return null;
    };

    const handleSaveChanges = async () => {
        const validationError = validateFormData();
        if (validationError) {
            setError(validationError);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
        formDataToSend.append('tags', formData.tags);
        if (selectedFile) {
            formDataToSend.append('avatar', selectedFile);
        }
        console.log('Form data to send:', [...formDataToSend]);
        try {
            const response = await axiosInstance.put(`/users/${userData._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onSave(response.data);
        } catch (error_) {
            setError(error_.response?.data?.message || 'Помилка при збереженні даних');
        }
    };

    return (
        <div className="edit-profile-container">
            {error && <p className="error-message">{error}</p>}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload" className="custom-file-upload" style={{ cursor: 'pointer' }}>
                Вибрати фото для профілю
            </label>
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Ім'я"
                className="input"
                style={{ fontSize: 18 }}
            />
            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Біографія"
                className="input bio"
            />
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Введіть теги через кому "
                className="input"
                style={{ fontSize: 18 }}
            />
            <div className="buttons">
                <button
                    onClick={onCancel}
                    className="button-black"
                    style={{ width: 150, backgroundColor: 'red', marginRight: 10 }}
                >
                    Скасувати
                </button>
                <button onClick={handleSaveChanges} className="button-black" style={{ width: 150 }}>
                    Зберегти
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
