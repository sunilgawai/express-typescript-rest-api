import { NextFunction, Request, Response, RequestHandler } from "express";

class UserController {
    static getProfile : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const access_token = req.access_token;
        res.json({user, access_token})
    }
    
}

// const userController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//     return res.status(200).json({ msg: 'user...' })
// }

export {UserController};