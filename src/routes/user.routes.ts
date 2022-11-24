import { Router, IRouter } from "express";
import { loginController, registerController, UserController } from "../controllers";
import { auth } from "../middlewares";

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
userRoutes.get('/profile', auth, UserController.getProfile);

/**
 * Refresh Token.
 */
userRoutes.post('/refresh-token', UserController.refreshToken);

/**
 * Logout Route.
 */
userRoutes.post('/logout', auth, UserController.logout);
// Define your routes here....


export default userRoutes;