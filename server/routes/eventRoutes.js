import express from 'express';
import multer from 'multer';

import { verifyToken } from '../middleware/authMiddleware.js';
import { Event } from '../Models/event.js';
import { createEventValidation } from '../validation/eventValidation.js';

const router = express.Router();
const upload = multer();
router.post('/create', verifyToken, upload.single('image'), createEventValidation, async (req, res) => {
    try {
        console.log('Тіло запиту:', req.body);
        const { title, description, startLocation, endLocation, startDate, endDate, maxParticipants, tags } = req.body;
        const author = req.user.id;
        const newEvent = new Event({
            title,
            description,
            startLocation,
            endLocation,
            startDate,
            endDate,
            maxParticipants,
            tags,
            author,
        });
        if (req.file) {
            newEvent.image = req.file.buffer.toString('base64');
        }
        await newEvent.save();
        res.status(201).json({ message: 'Подію створено успішно', event: newEvent });
    } catch (error) {
        console.error('Помилка при створенні події:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});
router.get('/search', verifyToken, async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const regex = new RegExp(searchQuery, 'i');
        const events = await Event.find({ title: regex }).populate('author', 'fullName');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});

export default router;
