import { Service } from "typedi";
import PayfastPaymentModel from "../models/PayfastPaymentModel";
import md5 from "md5";
import { envconfig } from "../../envconfig";
import PaymentDetailsModel from "../models/PaymentDetailsModel";

@Service()
export default class BillingService {
    private pf_merchant_Id?: string;
    private pf_merchant_key?: string;
    private pf_payfast_url?: string;
    private pf_passphrase?: string;

    constructor() {
      () => {
        this.pf_merchant_Id = envconfig.pf_merchant_id;
        this.pf_merchant_key = envconfig.pf_merchant_key;
        this.pf_payfast_url = envconfig.pf_payfastUrl;
        this.pf_passphrase = envconfig.pf_payfastUrl;
      };
    }
  /**
   * Generates the checkout url that redirects you to the payfast payment page
   * @param paymentDetailModel
   * @returns url
   */
  generateCheckOutUrl = (paymentDetails: PaymentDetailsModel) => {

    if(!this.pf_merchant_Id){throw new Error("Invalid payfast merchant Id")};
    if(!this.pf_merchant_key){throw new Error("Invalid payfast merchant key")};
    if(!this.pf_payfast_url){throw new Error("Invalid payfast url")};

    const paymentModel: PayfastPaymentModel = {
        merchant_id: this.pf_merchant_Id,
        merchant_key: this.pf_merchant_key,
        ...paymentDetails
      }

    let queryStr = this.generateQueryString(paymentModel);
    const signature = this.generateSignature(
      paymentModel,
      this.pf_passphrase
    );
    queryStr += `&signature=${signature}`;
    const result = `${this.pf_payfast_url}/eng/process?${queryStr}`;
    return result;
  };

  /**
   * Generates the url query string (Inline with the Payfast Documentation)
   * @param data 
   * @returns 
   */
  private generateQueryString = (data: PayfastPaymentModel) => {
    // Create parameter string
    const propertyNames = Object.keys(data);
    const propertyValues = Object.values(data);
    let valuePairConcatenation = "";
    propertyNames.map(
      (key, index) =>
        (valuePairConcatenation += `${key}=${encodeURIComponent(
          propertyValues[index]
        ).replace(/%20/g, "+")}&`)
    );

    // Remove last ampersand
    valuePairConcatenation = valuePairConcatenation.substring(
      0,
      valuePairConcatenation.length - 1
    );
    return valuePairConcatenation;
  };

  /**
   * Generate the payfast signature (according to payfast documentation)
   * @param data 
   * @param passPhrase 
   * @returns 
   */
  private generateSignature = (
    data: PayfastPaymentModel,
    passPhrase?: string
  ) => {
    let query = this.generateQueryString(data);
    if (passPhrase != null) {
      query += `&passphrase=${encodeURIComponent(passPhrase).replace(
        /%20/g,
        "+"
      )}`;
    }
    const result = md5(query);
    return result;
  };
}