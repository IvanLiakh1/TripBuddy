import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './component/auth/Login/Login.jsx';
import Register from './component/auth/Register/Register.jsx';
import { RequireAuth } from './component/auth/verifyJWT.js';
import EventConstructorPage from './pages/events/eventConstructorPage.jsx';
import EventsPage from './pages/events/eventsPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Profilepage from './pages/profile/ProfilePage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <HomePage />
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
    {
        path: '/profile',
        element: <Profilepage />,
    },
    {
        path: '/create',
        element: <EventConstructorPage />,
    },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(<RouterProvider router={router} />);
