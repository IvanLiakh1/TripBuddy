import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../../server/axios/axiosInstance.js';
import defimage from '../../assets/image 2.png';
import Layout from '../../component/layout.js';

function EventConstructorPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startLocation: '',
        endLocation: '',
        startDate: '',
        endDate: '',
        maxParticipants: '',
        tags: [],
        image: null,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(defimage);
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

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
                setPreviewImage(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.title) {
            errors.title = "Назва події є обов'язковою";
        } else if (formData.title.length > 25) {
            errors.title = 'Назва події не повинна перевищувати 25 символів';
        }

        if (!formData.description) {
            errors.description = "Опис події є обов'язковим";
        } else if (formData.description.length > 150 || formData.description.length <= 10) {
            errors.description = 'Кількість символів замала або завелика (10-150)';
        }

        if (!formData.startLocation) {
            errors.startLocation = "Початкова точка є обов'язковою";
        }

        if (!formData.endLocation) {
            errors.endLocation = "Кінцева точка є обов'язковою";
        }

        if (!formData.startDate) {
            errors.startDate = "Дата початку є об'язковою";
        } else if (!Date.parse(formData.startDate)) {
            errors.startDate = 'Дата початку повинна бути у форматі ISO 8601';
        }

        if (!formData.endDate) {
            errors.endDate = "Дата закінчення є обов'язковою";
        } else if (!Date.parse(formData.endDate)) {
            errors.endDate = 'Дата закінчення повинна бути у форматі ISO 8601';
        }

        if (!formData.maxParticipants || formData.maxParticipants < 2) {
            errors.maxParticipants = 'Максимальна кількість учасників повинна бути більше одного';
        }

        return errors;
    };
    const handleSaveChanges = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('startLocation', formData.startLocation);
        formDataToSend.append('endLocation', formData.endLocation);
        formDataToSend.append('startDate', formData.startDate);
        formDataToSend.append('endDate', formData.endDate);
        formDataToSend.append('maxParticipants', formData.maxParticipants);
        formDataToSend.append('tags', []);
        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }
        try {
            const response = await axiosInstance.post(`/event/create`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error_) {
            console.error('Помилка при збереженні даних:', error_);
            setError(error_.response?.data?.message || 'Помилка при збереженні даних');
        }
    };
    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="app-container">
            <Layout>
                <div className="position-center-width">
                    <div className="create-event" style={{ marginTop: 20 }}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <h2 className="create-event-font">Назва події</h2>
                                <div className="search-container" style={{ width: 450 }}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Велоподорож до Карпат"
                                        className="search_input"
                                        style={{ width: 450 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload">
                                    <img
                                        src={previewImage}
                                        className="previewImage"
                                        alt="Upload"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                            </div>
                        </div>
                        {formErrors.title && <p style={{ color: 'red' }}>{formErrors.title}</p>}

                        <h2 className="create-event-font">Опис події</h2>
                        <div className="search-container">
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Крута подорож. Бери друзів і погнали."
                                className="search_input"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ resize: 'none' }}
                            />
                        </div>
                        {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}

                        <h2 className="create-event-font">Початкова точка</h2>
                        <div className="search-container">
                            <input
                                type="text"
                                name="startLocation"
                                value={formData.startLocation}
                                onChange={handleInputChange}
                                placeholder="Велоподорож до Карпат"
                                className="search_input"
                            />
                        </div>
                        {formErrors.startLocation && <p style={{ color: 'red' }}>{formErrors.startLocation}</p>}

                        <h2 className="create-event-font">Кінцева точка</h2>
                        <div className="search-container">
                            <input
                                type="text"
                                name="endLocation"
                                value={formData.endLocation}
                                onChange={handleInputChange}
                                placeholder="Велоподорож до Карпат"
                                className="search_input"
                            />
                        </div>
                        {formErrors.endLocation && <p style={{ color: 'red' }}>{formErrors.endLocation}</p>}

                        <div className="start-end-date">
                            <div>
                                <h2 className="create-event-font">Дата початку</h2>
                                <div className="search-container" style={{ width: 160 }}>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="search_input"
                                        style={{ width: 160 }}
                                        min={getTodayDate()}
                                    />
                                </div>
                                {formErrors.startDate && <p style={{ color: 'red' }}>{formErrors.startDate}</p>}
                            </div>
                            <div>
                                <h2 className="create-event-font">Дата закінчення</h2>
                                <div className="search-container" style={{ width: 160 }}>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="search_input"
                                        style={{ width: 160 }}
                                        min={getTodayDate()}
                                    />
                                </div>
                                {formErrors.endDate && <p style={{ color: 'red' }}>{formErrors.endDate}</p>}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 className="create-event-font">Максимальна кількість учасників: </h2>
                            <div className="search-container" style={{ maxWidth: 70, marginLeft: 20, maxHeight: 10 }}>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleInputChange}
                                    className="search_input"
                                    min={2}
                                    max={100}
                                    defaultValue={2}
                                />
                            </div>
                            {formErrors.maxParticipants && <p style={{ color: 'red' }}>{formErrors.maxParticipants}</p>}
                        </div>

                        <div className="buttons">
                            <button
                                onClick={handleCancel}
                                className="button-black"
                                style={{ width: 150, backgroundColor: 'darkred' }}
                            >
                                Скасувати
                            </button>
                            <button onClick={handleSaveChanges} className="button-black" style={{ width: 150 }}>
                                Зберегти
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default EventConstructorPage;
