import PaymentDetailsModel from "./PaymentDetailsModel";

/**
 * Payfast payment model this extends the payment details model
 */
interface PayfastPaymentModel extends PaymentDetailsModel {
    // merchant details
    /**
     * [(integer, 8 char)];
     * The Merchant ID as given by the PayFast system.
     * Used to uniquely identify the receiving account.
     * This can be found on the merchant’s settings page.
     * 
     * */
    merchant_id: string,
    /**
     * The Merchant Key as given by the PayFast system.
     * Used to uniquely identify the receiving account.
     * This provides an extra level of certainty concerning the correct 
     * account as both the ID and the Key must be correct in order for the 
     * transaction to proceed. This can be found on the merchant’s settings page.
     */
    merchant_key: string,
    /**
     * The URL where the user is returned to after payment has been successfully taken.
     */
    return_url?: string,
    /**
     * The URL where the user should be redirected should they choose to cancel their payment while on the PayFast system.
     */
    cancel_url?: string,
    /**
     * The URL which is used by PayFast to post the Instant Transaction Notifications (ITNs) for this transaction.
     */
    notify_url?: string
}

export default PayfastPaymentModel;