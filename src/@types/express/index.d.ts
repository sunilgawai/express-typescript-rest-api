import { JwtPayload } from 'jsonwebtoken';
// import { Express, Request } from "express-serve-static-core";
// import { JwtPayload } from "jsonwebtoken";
// import { JwtPayloadData } from "./src/types";


import express from "express";

declare global {
    // Providing Custom Request Properties/Interface.
    namespace Express {
        interface Request {
            user?: Record<string, any>
            access_token: string | JwtPayload
        }
    }
}

// Providing Global Path for the application.
declare global {
    namespace NodeJS {
        interface Global {
            appRoot: string;
        }
    }
}

// // user object on request 
// interface UserRequestObject {
//     _id: string
//     name: string
//     email: string
//     role: string
// }

// declare module "express-serve-static-core" {
//     interface Request {
//         user: {
//             _id: string
//             role: string
//         }
//         access_token: string | JwtPayload
//     }
// }