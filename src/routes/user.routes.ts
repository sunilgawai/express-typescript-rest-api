import { Router, IRouter } from "express";
import { loginController, registerController, userController } from "../controllers";

const userRoutes: IRouter = Router();


/**
 * Register User.
 */

userRoutes.post('/register', registerController);
/**
 * Login User.
 */
userRoutes.post('/login', loginController);

/**
 * User Operation Routes.
 */

// Define your routes here....
userRoutes.get('/user/profile', userController);



export default userRoutes;