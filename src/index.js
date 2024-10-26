import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './component/auth/Login/Login.jsx';
import Register from './component/auth/Register/Register.jsx';
import { RequireAuth } from './component/auth/verifyJWT.js';
import EventsPage from './pages/events/eventsPage.jsx';
import App from './pages/home/App.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <App />
            </RequireAuth>
        ),
    },
    {
        path: '/events',
        element: (
            <RequireAuth>
                <EventsPage />
            </RequireAuth>
        ),
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
