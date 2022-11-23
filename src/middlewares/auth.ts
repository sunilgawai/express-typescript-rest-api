import { Request, Response, NextFunction, RequestHandler } from "express";
import { CustomErrorHandler, JwtService } from "../services";
import { JwtPayloadData } from "../@types";


const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // getting all the headers from request...
    try {
        // Checking if Autherization Header is present or not.
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(CustomErrorHandler.unAuthorized());
        }

        // Checking if Autherization Token is present or not.
        const access_token = authHeader.split(' ')[1];
        if (!access_token) {
            return next(CustomErrorHandler.unAuthorized());
        }

        // Appending the user properties to Request Interface.
        req.access_token = access_token;

        // Appending the user properties to Request Interface.
        let { _id, role } = <JwtPayloadData>JwtService.verify(access_token);
        if (req.user) {
            req.user._id = _id;
            req.user.role = role;
        }

    } catch (error) {
        return next(error);
    }

    next();
}

export default auth;