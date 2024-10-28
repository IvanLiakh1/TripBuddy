import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { Event } from '../Models/event.js';
import { createEventValidation } from '../validation/eventValidation.js';

const router = express.Router();

router.post('/create', verifyToken, createEventValidation, async (req, res) => {
    try {
        const { title, description, startLocation, endLocation, startDate, endDate, maxParticipants, tags, image } =
            req.body;
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
            image,
            author,
        });
        await newEvent.save();
        res.status(201).json({ message: 'Подію створено успішно', event: newEvent });
    } catch (error) {
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
