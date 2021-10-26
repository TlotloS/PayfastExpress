import express from "express";
import Container from "typedi";
import { envconfig } from "../../envconfig";
import PaymentDetailsModel from "../models/PaymentDetailsModel";
import BillingService from "../services/billingService";
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
    return res.status(400).json({
      status: "error",
      error: "Missing required field: item_description",
    });
  }
  const checkoutUrl = await _billingService.GenerateCheckOutUrl(paymentDetails);
  res.status(200).send(checkoutUrl);
});

router.post("/itn", async (req, res) => {
  const pfHost = envconfig.IS_DEV_ENV
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za";

  const pfData = JSON.parse(JSON.stringify(req.body));

  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  // remove the last ampersand
  pfParamString = pfParamString.substring(0, pfParamString.length - 1);
  var result = _billingService.pfValidSignature(pfData, pfParamString);

  res.status(200).send();
});
export default router;
