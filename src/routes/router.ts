import testRouter from "./testAPI";
import userRouter from "./userAPI";
import express  from "express";

const router = express.Router();

router.use("/users",userRouter);
router.use("/test",testRouter);

export default router;