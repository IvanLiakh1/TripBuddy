import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { verifyToken } from '../middleware/authMiddleware.js';
import { Event } from '../Models/event.js';
import { createEventValidation } from '../validation/eventValidation.js';

const router = express.Router();
const upload = multer();
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
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id).populate('author', 'fullName').populate('participants', '_id fullName');
        if (!event) {
            return res.status(404).json({ message: 'Подію не знайдено' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Помилка при отриманні події:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
});
router.put('/:id/participate', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const event = await Event.findById(id);
        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ message: 'Максимальна кількість учасників досягнута' });
        }
        if (!event.participants.includes(userId)) {
            event.participants.push(userId);
            await event.save();
        }
        res.json(event);
    } catch (error) {
        console.error('Помилка при додаванні учасника:', error);
        res.status(500).send('Помилка сервера');
    }
});
router.put('/:id/leave', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        console.log(`Запит на видалення учасника: Подія ID = ${id}, Користувач ID = ${userId}`);

        const event = await Event.findById(id);
        if (!event) {
            console.log('Подія не знайдена');
            return res.status(404).json({ message: 'Подія не знайдена' });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        console.log('Учасники події:', event.participants);

        const participantIndex = event.participants.findIndex((participantId) => participantId.equals(userObjectId));

        if (participantIndex === -1) {
            console.log('Користувач не є учасником події');
            return res.status(400).json({ message: 'Користувач не є учасником події' });
        } else {
            console.log(`Користувач ${userId} знайдений серед учасників, видаляємо...`);
            event.participants.splice(participantIndex, 1);
            await event.save();
            console.log('Оновлені учасники:', event.participants);
        }

        res.json(event);
    } catch (error) {
        console.error('Помилка при видаленні учасника:', error);
        res.status(500).send('Помилка сервера');
    }
});

export default router;
