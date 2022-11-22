import { Router, IRouter } from "express";
import { loginController, registerController, UserController } from "../controllers";
import { auth } from "../middlewares";
// import UserController from "../controllers/auth/userController";

const userRoutes: IRouter = Router();

/**
 * User Operation Routes.
 */

/**
 * Register User.
 */

userRoutes.post('/register', registerController);
/**
 * Login User.
 */
userRoutes.post('/login', loginController);

/**
 * Profile Get
 */

userRoutes.get('/profile', auth, UserController.getProfile );

// Define your routes here....


export default userRoutes;