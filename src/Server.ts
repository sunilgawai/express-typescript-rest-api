import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';
import { APP_PORT } from "../config";
import { DataBaseConnection } from "../database";
import { errorHandler } from "./middlewares";
import { productRoutes, userRoutes } from "./routes";
const app: Application = express();

// Database connection....
DataBaseConnection();

// Middlewares....
// Global Application Path.

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes....
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin/products', productRoutes);
app.use('/', (_req: Request, _res: Response, _next: NextFunction) => {
    _res.send(`<h1> <404/> No data found for this route</h1>`);
})

// Error Handler....
app.use(errorHandler);

app.listen(APP_PORT || 4000, () => console.log(`listening on http://localhost:${APP_PORT}`))