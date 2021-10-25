import testRouter from "./testAPI";
import billingRouter from "./billingAPI";
import express  from "express";

const router = express.Router();

router.use("/test",testRouter);
router.use("/billing",billingRouter);

export default router;