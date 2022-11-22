import { NextFunction, Request, Response, RequestHandler } from "express";

class UserController {
    static getProfile : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        res.json({name:" profile"})
    }

    
}

// const userController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//     return res.status(200).json({ msg: 'user...' })
// }

export default UserController;