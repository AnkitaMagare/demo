// rules
import { body } from 'express-validator';

export const signupValidation = [
    body('name').exists().isLength({min: 3}).withMessage('Name must be at least  3 characters long'),
    body('email').notEmpty().withMessage('Email not provieded')
    .isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('password not provided')
    .isLength({ min: 4, max: 6 }).withMessage('Password must be between 4 and 6 characters long')
]

export const loginValidation = [
    body('email').isEmail().withMessage("Invalid email format"),
    body('password').notEmpty().withMessage("Password is required"),
];