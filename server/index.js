import cors from 'cors';
import express from 'express';

import connectDB from '../Config/db.config.js';
import { loginUser,registerUser } from './controllers/authController.js';
import { createEvent, searchEvents } from './controllers/eventController.js';
import { verifyToken } from './middleware/authMiddleware.js';
import { createEventValidation } from './Validation/eventValidation.js';
import { registerValidation } from './Validation/userValidation.js';

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
app.use(express.json());
app.use(cors());
app.post('/api/register', registerValidation, registerUser);
app.post('/api/login', loginUser);
app.post('/api/createEvent', verifyToken, createEventValidation, createEvent);
app.get('/api/searchEvents', searchEvents);
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
