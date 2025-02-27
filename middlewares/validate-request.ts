import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                                   // if (errors.isEmpty() != true) 
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();  // move to the next middleware or controller if no error
};

