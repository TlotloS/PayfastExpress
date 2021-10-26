import cors from "cors";
import express from "express";
import { createConnection } from "typeorm";
import { envconfig as ENV_VARIABLES } from "../envconfig";
import appRouter from "./routes/router";
import ngrok from "ngrok";

const app: express.Application = express();
const port = ENV_VARIABLES.APPLICATION_PORT;
const main = async () => {
  await createConnection();

  if(ENV_VARIABLES.IS_DEV_ENV)
  {
    const url = await ngrok.connect(ENV_VARIABLES.APPLICATION_PORT);
    ENV_VARIABLES.pf_returnUrl = url;
  }
  
  app.use(express.json()); // json body-parser
  app.use(express.urlencoded({ extended: true }));
  app.use(appRouter); // router

  app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
  });
};

main();
