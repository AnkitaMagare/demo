import  {Response, Request} from 'express';
import prisma from '../prisma';
import {hashSync, compareSync} from 'bcrypt';        // used to encrypt password(hash) & compare
import * as jwt from 'jsonwebtoken';
import {JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRES, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRES} from '../secrets'
import { SendWelcomeEmail } from '../helper/sendEmail';
import { validationResult } from 'express-validator';


export const signup = async(req: Request, res: Response) => {

    const{name, email, password} = req.body;
    let user = await prisma.user.findFirst({where: {email}});
    if (user) {
        res.status(400).json({error: 'user already exists'});
        return;
    }
    // creating new user
    user = await prisma.user.create({data: {
        name,
        email,
        password: hashSync(password, 10)            // saultdata-randomly generated string added to a password before it is hashed
    }});

    // send welcome email to newly created user
    SendWelcomeEmail(email);

    res.status(201).json({user})
    return;
}



export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    let user = await prisma.user.findFirst({where: {email}});
    if (!user) {
        res.status(404).json({error: 'user not found'});
        return;
    }
    if (!compareSync(password, user.password)) {
        res.status(400).json({error: 'incorrect password '});
        return;
    }

    const access_token = jwt.sign(
        {userId: user.id},
        JWT_ACCESS_SECRET,
        { expiresIn: parseInt(ACCESS_TOKEN_EXPIRES) }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        JWT_REFRESH_SECRET,
        {expiresIn: parseInt(REFRESH_TOKEN_EXPIRES)}
    );

    res.json({user, access_token, refreshToken});
}