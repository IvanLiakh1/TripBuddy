import './regStyle.css';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (error) => {
        error.preventDefault();
        console.log('Надсилаємо запит на реєстрацію...');
        try {
            const response = await axios.post('http://localhost:3000/api/register', { fullName, email, password });
            console.log('Реєстрація успішна:', response);
            navigate('/login', { replace: true });
            setMessage(response.data.message);
            setErrors([]);
        } catch (error_) {
            console.log('Помилка реєстрації:', error_);
            if (error_.response) {
                if (error_.response.data.errors) {
                    setErrors(error_.response.data.errors);
                } else if (error_.response.data.error) {
                    setErrors([{ msg: error_.response.data.error }]);
                } else {
                    setErrors([{ msg: 'Сталася невідома помилка.' }]);
                }
            } else {
                setErrors([{ msg: 'Сталася помилка з запитом.' }]);
            }
            console.log(errors);
        }
    };

    return (
        <div className="auth">
            <div className="formContainer">
                <h2>Реєстрація</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Електронна адреса"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.some((error) => error.path === 'email') && (
                        <div className="error-message">Некоректний email</div>
                    )}
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.some((error) => error.path === 'password') && (
                        <div className="error-message">Пароль повинен містити не менше 5 символів</div>
                    )}
                    <input
                        type="text"
                        placeholder="Повне ім'я"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.some((error) => error.path === 'fullName') && (
                        <div className="error-message">
                            Ім'я повинно містити не менше 3 символів та складатися тільки з букв.
                        </div>
                    )}
                    {errors.some((error) => error.msg === 'Користувач вже існує.') && (
                        <div className="error-message">Користувач вже існує</div>
                    )}
                    <button type="submit">Зареєструватися</button>
                </form>
                <div className="login-link">
                    Вже маєте акаунт? <a href="/login">Увійдіть</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
