import { body } from 'express-validator';
import moment from 'moment';

export const registerValidation = [
    body('email').isEmail().withMessage('Некоректний email.'),
    body('password').isLength({ min: 5 }).withMessage('Пароль повинен містити не менше 5 символів.'),
    body('fullName')
        .isLength({ min: 3 })
        .withMessage("Ім'я повинно містити не менше 3 символів.")
        .matches(/^[\s'A-Za-zЁЄІЇА-яёєії’-]+$/)
        .withMessage("Ім'я не повинно містити цифри або спеціальні символи."),
    body('dateOfBirth')
        .isDate()
        .withMessage('Некоректний формат дати.')
        .custom((value) => {
            const birthDate = moment(value, 'YYYY-MM-DD');
            const age = moment().diff(birthDate, 'years');
            return age >= 14 && age <= 80;
        })
        .withMessage('Вік користувача повинен бути не менше 14 і не більше 80 років.'),
];
