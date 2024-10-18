import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import Login from './component/auth/Login/Login.jsx';
import Register from './component/auth/Register/Register.jsx';
import { RequireAuth } from './component/auth/verifyJWT.js';

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
