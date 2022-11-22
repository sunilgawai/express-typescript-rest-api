import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, RequestHandler } from "express";
import User from "../../models/User";
import { CustomErrorHandler, JwtService } from "../../services";
import { loginSchema } from "../../validators";



const loginController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // check error in request.
    const { error } = loginSchema.validate(req.body);

    if(error) {
        return next(error);
    }

    // check the email if exists or not.
    let user;
    let access_token;
    try {
        user = await User.findOne({email});
        if(!user) {
            return next(CustomErrorHandler.notFound("User Not Found"));
        }

        // check the password if match or not.
        let matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        // Access Token.
        access_token = await JwtService.sign({
            _id: user._id,
            role: user.role
        })
    } catch (error) {
        return next(error);
    }

    // return the response.
    return res.status(200).json({ user, access_token });
}

export default loginController;