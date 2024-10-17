import express from 'express';
import connectDB from '../Config/db.config.js';
import { registerUser, loginUser } from './controllers/authController.js';
import { registerValidation } from './Validation/userValidation.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
app.use(express.json());
app.use(cors());
app.post('/api/register', registerValidation, registerUser);
app.post('/api/login', loginUser);

app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
