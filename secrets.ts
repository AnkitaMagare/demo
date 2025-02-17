import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
 
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;    // ! jwt var is present in .env if not used ! throws undefined error
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES!;
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES!;