import { param } from "express-validator";

export const validateProductId = [
    param('id').isInt().withMessage('id should be integer')
]