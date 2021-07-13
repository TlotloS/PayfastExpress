import express from "express";
import { createConnection } from "typeorm";
import {envconfig as ENV_VARIABLES, swagger_path } from "../envconfig";
import appRouter from "./routes/router";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load(swagger_path);


const app: express.Application = express();
const port = ENV_VARIABLES.APPLICATION_PORT;

const main = async () => {
    await createConnection();

    app.use(express.json()); // json body-parser
    app.use(appRouter); // router

    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument)); // swagger

    app.listen(port, () => {
        console.log(`Application listening at http://localhost:${port}`)
    })
}

main();