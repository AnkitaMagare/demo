import { Router } from "express";
import { signup, login } from "../controllers/auth-controller";

const authRoute: Router = Router();


authRoute.post('/signup', signup);
authRoute.post('/login', login);


export default authRoute;