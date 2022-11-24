import { NextFunction, Request, Response, RequestHandler } from "express";
import { JwtPayloadData } from "../../@types";
import { CustomErrorHandler, JwtService } from "../../services";
import Joi from "joi";
import { RefreshToken, User } from "../../models";
import { REFRESH_SECRET } from "../../../config";

class UserController {
    static getProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        const access_token = req.access_token;
        try {
            let { _id } = <JwtPayloadData>JwtService.verify(req.access_token as string);
            const user = await User.findOne({ _id }).select('-createdAt -updatedAt -__v -password')
            res.json({ user, access_token })
        } catch (error) {
            return next(error);
        }
    }

    static refreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        // validate the request.
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })
        const { error } = refreshSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        console.log(req.body)
        let access_token;
        let refresh_token;
        try {
            // Find the token in database.
            const token = await RefreshToken.findOne({ token: req.body.refresh_token });
            console.log('token',token)
            if (!token) {
                return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"));
            }

            // get user details from refresh_token.
            let userId;
            try {
                const { _id } = await <JwtPayloadData>JwtService.verify(token.token, REFRESH_SECRET);
                userId = _id;
            } catch (error) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            // Find the user.
            let user = await User.findOne({ _id: userId });
            console.log('user', user)
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found'))
            }

            // Generating both the Tokens.
            access_token = JwtService.sign({ _id: user._id, role: user.role });
            refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);

            // Database whitelist.
            await RefreshToken.create({ token: refresh_token });
        } catch (error) {
            return next(error);
        }

        res.json({ access_token, refresh_token });
    }

}

// const userController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//     return res.status(200).json({ msg: 'user...' })
// }

export default UserController;