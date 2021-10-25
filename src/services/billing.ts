import { Service } from "typedi";
import PayfastPaymentModel from "../models/PayfastPaymentModel";
import md5 from "md5";
import { envconfig } from "../../envconfig";
import PaymentDetailsModel from "../models/PaymentDetailsModel";
import { getConnection } from "typeorm";
import { PayfastPayment } from "../entity/PayfastPayments";
import { v4 as uuidv4 } from "uuid";

@Service()
export default class BillingService {
    private pf_merchant_Id?: string;
    private pf_merchant_key?: string;
    private pf_payfast_url?: string;
    private pf_passphrase?: string;

    constructor() {
        this.pf_merchant_Id = envconfig.pf_merchant_id;
        this.pf_merchant_key = envconfig.pf_merchant_key;
        this.pf_payfast_url = envconfig.pf_payfastUrl;
        this.pf_passphrase = envconfig.pf_passphrase;
    }
  /**
   * Generates the checkout url that redirects you to the payfast payment page
   * @param paymentDetailModel
   * @returns url
   */
  GenerateCheckOutUrl = async (paymentDetails: PaymentDetailsModel) => {

    if(!this.pf_merchant_Id){throw new Error("Invalid payfast merchant Id")};
    if(!this.pf_merchant_key){throw new Error("Invalid payfast merchant key")};
    if(!this.pf_payfast_url){throw new Error("Invalid payfast url")};

    const paymentModel: PayfastPaymentModel = {
        merchant_id: this.pf_merchant_Id,
        merchant_key: this.pf_merchant_key,
        ...paymentDetails
      }

    let queryStr = this.GenerateQueryString(paymentModel);
    
    console.log(paymentModel,this.pf_passphrase);
    const signature = this.GenerateSignature(
      paymentModel,
      this.pf_passphrase
    );
    queryStr += `&signature=${signature}`;
    const result = `${this.pf_payfast_url}/eng/process?${queryStr}`;

    await this.AddNewPayment(paymentDetails);
    return result;
  };

  private AddNewPayment = async (data: PaymentDetailsModel) => {
    const repo = getConnection()
    .getRepository(PayfastPayment);

    const paymentId = `pf_${uuidv4()}`;
    const newPayment = repo.create({...data, m_payment_id: paymentId})
    await repo.save(newPayment);
  }


  /**
   * Generates the url query string (Inline with the Payfast Documentation)
   * @param data 
   * @returns 
   */
  private GenerateQueryString = (data: PayfastPaymentModel) => {
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
  private GenerateSignature = (
    data: PayfastPaymentModel,
    passPhrase?: string
  ) => {
    let query = this.GenerateQueryString(data);
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
