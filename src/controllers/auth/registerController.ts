import { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";
import { registerSchema } from "../../validators";
import { CustomErrorHandler, JwtService } from "../../services";
import { REFRESH_SECRET } from "../../../config";
import { RefreshToken } from "../../models";



const registerController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body.
    const { error } = registerSchema.validate(req.body);
    console.log(req.body);
    // Handle Schema Error.
    if (error) {
        return next(error);
    }

    const { name, email, password } = req.body;

    // Check if user already exists...
    let exists = await User.findOne({ email });

    if (exists) {
        console.log('user exists')
        return next(CustomErrorHandler.alreadyExists("Email address already exists"))
    }
    // Hash the Password.
    let hashedPassword: string = await bcrypt.hash(password, 10);

    // Register User.
    let result;
    try {
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        result = await user.save();
    } catch (error) {
        return next(error);
    }
    console.log(result);

    // Create JWT Tokens.
    let access_token: string;
    let refresh_token: string;
    try {
        access_token = JwtService.sign({ _id: result._id, role: result.role });
        refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);
    } catch (error) {
        return next(error);
    }

    // Database whitelisting.
    let token = await new RefreshToken({ token: refresh_token }).save()
    console.log(token)

    // Return Data.
    return res.status(200).json({ result, access_token, refresh_token });
}


export default registerController;