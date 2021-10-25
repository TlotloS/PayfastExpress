import express from 'express';
import Container from 'typedi';
import PaymentDetailsModel from '../models/PaymentDetailsModel';
import BillingService from '../services/billing';
const router = express.Router();

const _billingService = Container.get(BillingService);

router.get('/payfast', (req, res) => {
    const paymentDetails : PaymentDetailsModel = req.body;
    if(paymentDetails.amount == null || paymentDetails.item_description == null)
    {
        return res.status(400).json({
            status: "error",
            error: "Missing required fields",
          });
    }
    const checkoutUrl = _billingService.generateCheckOutUrl(paymentDetails);
    res.status(200).send(checkoutUrl);
});

router.get('/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`)
});

export default router;