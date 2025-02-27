import { Router } from "express";
import { signup, login } from "../controllers/auth-controller";
import { signupValidation, loginValidation } from "../validators/auth-validations"; 
import { validateRequest } from "../middlewares/validate-request";

const authRoute: Router = Router();


// apply validation middleware before calling the controller
authRoute.post('/signup',signupValidation, validateRequest ,signup);
authRoute.post('/login', loginValidation, validateRequest ,login);


export default authRoute;