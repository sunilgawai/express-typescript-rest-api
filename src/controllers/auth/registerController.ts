import { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";
import { registerSchema } from "../../validators";
import { CustomErrorHandler, JwtService } from "../../services";



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
    let exists = await User.findOne({email});

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

    // Create JWT.
    let access_token: string;
    try {
        access_token = JwtService.sign({ _id: result._id, role: result.role})
    } catch (error) {
        return next(error);
    }

    // Return Data.
    return res.status(200).json({result, access_token});
    // return res.status(200).json({ msg: 'register user...' })
}


export default registerController;