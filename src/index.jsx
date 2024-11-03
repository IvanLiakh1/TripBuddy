import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './component/auth/Login/Login.jsx';
import Register from './component/auth/Register/Register.jsx';
import { RequireAuth } from './component/auth/verifyJWT.jsx';
import EventConstructorPage from './pages/events/CreatePage/eventConstructorPage.jsx';
import EventInfo from './pages/events/EventInfoPage/eventInfo.jsx';
import EventsPage from './pages/events/SearchEventsPage/eventsPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import Profilepage from './pages/ProfilePage/ProfilePage.jsx';

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
        element: (
            <RequireAuth>
                <Profilepage />
            </RequireAuth>
        ),
    },
    {
        path: '/create',
        element: (
            <RequireAuth>
                <EventConstructorPage />
            </RequireAuth>
        ),
    },
    {
        path: 'event',
        element: (
            <RequireAuth>
                <EventInfo />
            </RequireAuth>
        ),
    },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(<RouterProvider router={router} />);
