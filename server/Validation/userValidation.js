import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail().withMessage('Некоректний email.'),
    body('password').isLength({ min: 5 }).withMessage('Пароль повинен містити не менше 5 символів.'),
    body('fullName').isLength({ min: 3 }).withMessage('Ім\'я повинно містити не менше 3 символів.'),
];
