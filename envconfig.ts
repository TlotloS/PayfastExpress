import * as dotenv from "dotenv";
import * as path from "path";

const ENVIROMENT = process.env.NODE_ENV || 'development';
dotenv.config({
    path: path.resolve(__dirname, ".env"),
});

export const envconfig = {
    NODE_ENV: ENVIROMENT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process?.env?.DATABASE_PORT ?? "0", 10),
    SQL_USER: process.env.SQL_USER,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    DATABASE_SYNCRONIZE: process.env.DATABASE_SYNCRONIZE === "true",
    DATABASE_LOGGING: process.env.DATABASE_LOGGING === "true",
    APPLICATION_PORT: process.env.PORT,
}