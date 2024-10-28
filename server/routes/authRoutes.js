import process from 'node:process';

import bcrypt from 'bcrypt';
import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { verifyToken } from '../middleware/authMiddleware.js';
import { User } from '../Models/user.js';
import { registerValidation } from '../validation/userValidation.js';

const router = express.Router();

router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'Користувач вже існує.' });
        }
        const newUser = new User({
            fullName,
            email,
            password,
        });
        await newUser.save();
        res.status(201).json({ message: 'Користувач успішно створений.' });
    } catch {
        res.status(500).json({ message: 'Помилка сервера.' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неправильний email або пароль.' });
        }
        const isMatch = await bcrypt.compare(password, user.get('password'));
        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильний email або пароль.' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ message: 'Авторизація успішна.', token });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера.', error });
    }
});
router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const user = await User.findById(userId).select(-'password');
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});

export default router;
