import { check } from 'express-validator';

export const createEventValidation = [
    check('title')
        .notEmpty()
        .withMessage("Назва події є обов'язковою")
        .isLength({ max: 100 })
        .withMessage('Назва події не повинна перевищувати 100 символів'),
    check('description').notEmpty().withMessage("Опис події є обов'язковим"),
    check('startLocation').notEmpty().withMessage("Початкова точка є обов'язковою"),
    check('endLocation').notEmpty().withMessage("Кінцева точка є обов'язковою"),
    check('startDate').isISO8601().withMessage('Дата початку повинна бути у форматі ISO 8601').toDate(),
    check('endDate').isISO8601().withMessage('Дата закінчення повинна бути у форматі ISO 8601').toDate(),
    check('maxParticipants').isInt({ min: 1 }).withMessage('Максимальна кількість учасників повинна бути більше нуля'),
    check('tags').isArray().withMessage('Теги повинні бути масивом'),
    check('image').notEmpty().withMessage("Зображення є обов'язковим"),
];
