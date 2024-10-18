// src/components/LoginForm.jsx
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';

import { isAuthOK } from '../verifyJWT.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthOK()) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.message);
            navigate('/', { replace: true });
        } catch (error_) {
            setError(error_.response.data.message);
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleLogin}>
                <h2>Авторизація</h2>
                <div>
                    <input
                        type="email"
                        value={email}
                        placeholder="Електронна адреса"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red', alignSelf: 'start', marginBottom: '5px' }}>{error}</p>}
                <button type="submit">Увійти</button>
                <div className="login-link">
                    Ще не зареєструвалися? <a href="/register">Створіть аккаунт</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
