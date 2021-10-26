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
    private pf_returnUrl?: string;

    constructor() {
        this.pf_merchant_Id = envconfig.pf_merchant_id;
        this.pf_merchant_key = envconfig.pf_merchant_key;
        this.pf_payfast_url = envconfig.pf_payfastUrl;
        this.pf_passphrase = envconfig.pf_passphrase;
        this.pf_returnUrl = envconfig.pf_returnUrl;
    }
  /**
   * Generates the checkout url that redirects you to the payfast payment page
   * @param paymentDetailModel
   * @returns url
   */
  public GenerateCheckOutUrl = async (paymentDetails: PaymentDetailsModel) => {
    if(!this.pf_merchant_Id){throw new Error("Invalid payfast merchant Id")};
    if(!this.pf_merchant_key){throw new Error("Invalid payfast merchant key")};
    if(!this.pf_payfast_url){throw new Error("Invalid payfast url")};
    const paymentId = `${uuidv4()}`;

    const paymentModel: PayfastPaymentModel = {
        merchant_id: this.pf_merchant_Id,
        merchant_key: this.pf_merchant_key,
        return_url: envconfig.pf_returnUrl,
        notify_url: `${envconfig.pf_returnUrl}/billing/itn`,
        name_first: paymentDetails.name_first,
        name_last: paymentDetails.name_last,
        email_address:paymentDetails.email_address,
        cell_number: paymentDetails.cell_number,
        m_payment_id: paymentId,
        ...paymentDetails
      }

    let queryStr = this.GenerateQueryString(paymentModel);
    const signature = this.GenerateSignature(
      queryStr,
      this.pf_passphrase
    );
    queryStr += `&signature=${signature}`;
    const result = `${this.pf_payfast_url}/eng/process?${queryStr}`;

    await this.AddNewPayment(paymentDetails, paymentId);
    return result;
  };

  public pfValidSignature = (pfData: any, pfParamString: any) => {
    // Calculate security signature
    const signature = this.GenerateSignature(pfParamString, this.pf_passphrase);
    return pfData['signature'] === signature;
  }; 
  
  public pfValidPaymentData = ( cartTotal: any, pfData: any ) => {
    return Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <= 0.01;
  };

  private AddNewPayment = async (data: PaymentDetailsModel, m_payment_id: string) => {
    const repo = getConnection()
    .getRepository(PayfastPayment);
    const newPayment = repo.create({...data, m_payment_id})
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
      (key, index) => {
        if(propertyValues[index] != null)
        {
          valuePairConcatenation += `${key}=${encodeURIComponent(
            propertyValues[index]
          ).replace(/%20/g, "+")}&`
        }
      }
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
    queryString: string,
    passPhrase?: string
  ) => {
    if (passPhrase != null) {
      queryString += `&passphrase=${encodeURIComponent(passPhrase).replace(
        /%20/g,
        "+"
      )}`;
    }
    const result = md5(queryString);
    return result;
  };
}
