interface PaymentDetailsModel {
    // customer details
    /**
     * (string, 100 char). The customer’s first name.
     */
     name_first?: string,
     /**
      * (string, 100 char). The customer’s last name.
      */
     name_last?: string,
     /**
      * (string, 100 char). The customer’s email address.
      */
     email_address?: string,
     /**
      * (string, 100 char). 
      * The customer’s valid cell number. 
      * If the email_address field is empty, and cell_number provided, 
      * the system will use the cell_number as the username and auto login the user, 
      * if they do not have a registered account
      */
     cell_number?: string,
 
     //transaction details
     m_payment_id?: string,
     amount: number,
     item_name: string,
     /**
      * (string, 255 char).
      * The description of the item being charged for, or in the case of multiple items the order description.
      */
     item_description?: string,
     /** (integer, 255 char)*/
     custom_int1?: number,
     /** (integer, 255 char)*/
     custom_int2?: number,
     /** (integer, 255 char)*/
     custom_int3?: number,
     /** (integer, 255 char)*/
     custom_int4?: number,
     /** (integer, 255 char)*/
     custom_int5?: number,
     /**(string, 255 char)*/
     custom_str1?: string,
     /**(string, 255 char)*/
     custom_str2?: string,
     /**(string, 255 char)*/
     custom_str3?: string,
     /**(string, 255 char)*/
     custom_str4?: string,
     /**(string, 255 char)*/
     custom_str5?: string,
 
     //transaction options
     email_confirmation?: boolean,
     confirmation_adress?: string
}

export default PaymentDetailsModel;