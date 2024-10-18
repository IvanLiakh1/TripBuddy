import connectDB from '../../Config/db.config.js';
import {User} from '../Models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

await connectDB();

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;
    try
    {
        const exists = await User.findOne({email});
        if (exists){
            return res.status(400).json({error: 'Користувач вже існує.'});
        }
        const newUser = new User({
            fullName,
            email,
            password,
        });
        await newUser.save();
        res.status(201).json({ message: 'Користувач успішно створений.' });
    }
    catch(err)
    {
        res.status(500).json({ message: 'Помилка сервера.' });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неправильний email або пароль.' });
        }
        const isMatch = await bcrypt.compare(password, user.get("password"));
        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильний email або пароль.' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '40s' });
        res.status(200).json({ message: 'Авторизація успішна.', token });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера.', error });
    }
};
export const getMe = async (req,res) =>{

};

