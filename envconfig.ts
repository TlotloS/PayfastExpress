import * as dotenv from "dotenv";
import * as path from "path";

const ENVIRONMENT = process.env.NODE_ENV || 'development';
dotenv.config({
    path: path.resolve(__dirname, ".env"),
});

export const envconfig = {
    NODE_ENV: ENVIRONMENT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process?.env?.DATABASE_PORT ?? "0", 10),
    DATABASE_TYPE: process.env.DATABASE_TYPE ?? "",
    SQL_USER: process.env.SQL_USER,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    DATABASE_SYNCRONIZE: process.env.DATABASE_SYNCRONIZE === "true",
    DATABASE_LOGGING: process.env.DATABASE_LOGGING === "true",
    APPLICATION_PORT: process.env.PORT,

    pf_merchant_id: process.env.merchant_id,
    pf_merchant_key: process.env.merchant_key,
    pf_passphrase: process.env.passphrase,
    pf_payfastUrl: process.env.payfastUrl
}