import { Event } from '../Models/event.js';

export const createEvent = async (req, res) => {
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
};
export const searchEvents = async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const regex = new RegExp(searchQuery, 'i');
        const events = await Event.find({ title: regex }).populate('author', 'fullName');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};
