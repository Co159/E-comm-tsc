import { body } from 'express-validator';

const userValidation = [
    body('email').isEmail().withMessage('Invalid email format').notEmpty().normalizeEmail().trim(),

    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").trim(),
]

export default userValidation;