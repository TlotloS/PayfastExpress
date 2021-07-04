import express from "express";
import { createConnection } from "typeorm";
import {envconfig as ENV_VARIABLES } from "../envconfig";
const app: express.Application = express();
const port = ENV_VARIABLES.APPLICATION_PORT;

const main = async () => {
    await createConnection();

    app.get('/', (req, res) => {
        res.send('Hello World!')
        console.log('Time:', Date.now())
    });
    
    app.get('/:name', (req, res) => {
        res.send(`Hello ${req.params.name}`)
        console.log(req.params);
    });

    app.listen(port, () => {
        console.log(`Application listening at http://localhost:${port}`)
    })
}

main();