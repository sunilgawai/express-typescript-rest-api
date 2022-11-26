import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const rootUrl = path.resolve(__dirname);

export { rootUrl };

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    REFRESH_SECRET,
    APP_URL
} = process.env;