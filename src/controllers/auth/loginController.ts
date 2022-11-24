import { NextFunction, Request, Response, RequestHandler } from "express";
import { CustomErrorHandler, JwtService } from "../../services";
import { loginSchema } from "../../validators";
import User from "../../models/User";
import bcrypt from 'bcrypt';
import { REFRESH_SECRET } from "../../../config";
import { RefreshToken } from "../../models";



const loginController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // check data/error in request.
    const { error } = loginSchema.validate(req.body);
    console.log(email, password)
    if (error) {
        return next(error);
    }

    // check the email if exists or not.
    let user;
    let access_token;
    let refresh_token;
    try {
        user = await User.findOne({ email }).select('-createdAt -updatedAt -__v')
        if (!user) {
            return next(CustomErrorHandler.notFound("User Not Found"));
        }

        // check the password if match or not.
        let matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        // Access Token.
        access_token = await JwtService.sign({
            _id: user._id,
            role: user.role
        })

        // Refresh Token.
        refresh_token = await JwtService.sign({
            _id: user._id,
            role: user.role
        }, '1y', REFRESH_SECRET);

        let token = await new RefreshToken({ token: refresh_token }).save()
        console.log(token)
    } catch (error) {
        return next(error);
    }

    // return the response.
    return res.status(200).json({ user, access_token, refresh_token });
}

export default loginController;