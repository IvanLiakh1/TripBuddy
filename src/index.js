import express from 'express';
import connectDB from '../Config/db.config.js';
import {registerUser, loginUser} from '../server/controllers/authController.js'
import { registerValidation } from '../server/Validation/userValidation.js';


const app = express();
const PORT = process.env.PORT;

connectDB();
app.use(express.json());

app.post('/api/register',registerValidation, registerUser);

app.post('/api/login', loginUser);

app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
