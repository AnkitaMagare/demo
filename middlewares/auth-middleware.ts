// 1. get tokden from authorisation headers
// 2. if no token provided send error
// 3. verify the token using secrete key
// 4. if token is invalid/expired send error

import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from "../secrets";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];                         // extracts token like Bearer <token>

    if (!token) {
        res.status(401).json({error: 'unauthorised, no token provided'});
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);        // if verified it give the user information inside the token
        (req as any) .user = decoded;                                          // attached decoded user data to the req object

        next();                                                     // tells the server to continue to the next part of the request 
    }
    catch(error) {
        res.status(403).json({error: 'invalid or expired token'});
    }
}