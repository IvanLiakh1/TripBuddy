import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './component/auth/Login/Login.jsx';
import Register from './component/auth/Register/Register.jsx';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />
        },
        {
            path: '/login',
            element: <Login />,

        },
        {
            path: '/register',
            element: <Register />
        }
    ]
);

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
