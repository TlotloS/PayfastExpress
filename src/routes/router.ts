import testRouter from "./testAPI";
import express  from "express";
const router = express.Router();

router.use("/test",testRouter);

export default router;