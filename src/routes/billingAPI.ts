import express from "express";
import Container from "typedi";
import PaymentDetailsModel from "../models/PaymentDetailsModel";
import BillingService from "../services/billing";
const router = express.Router();

const _billingService = Container.get(BillingService);

router.post("/payfast", async (req, res) => {
  const paymentDetails: PaymentDetailsModel = req.body;
  if (paymentDetails.amount == null) {
    return res
      .status(400)
      .json({ status: "error", error: "Missing required field: amount" });
  }
  if (paymentDetails.item_name == null) {
    return res
      .status(400)
      .json({ status: "error", error: "Missing required field: item_name" });
  }
  if (paymentDetails.item_description == null) {
    return res
      .status(400)
      .json({
        status: "error",
        error: "Missing required field: item_description",
      });
  }

  const checkoutUrl = await _billingService.GenerateCheckOutUrl(paymentDetails);
  res.status(200).send(checkoutUrl);
});
export default router;
