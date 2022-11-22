import {Request, Response, NextFunction, RequestHandler} from "express";
import { CustomErrorHandler, JwtService } from "../services";

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // getting all the headers from request...
    let authHeader = req.headers.authorization;
    if(!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    let token = authHeader.split(' ')[1];
    // try {
        // const {_id, role } = await JwtService.verify(token);
        // console.log(_id, role);
    // } catch (error) {
    //     return next(CustomErrorHandler.unAuthorized());
    // }
    console.log(token);

}

export default auth;