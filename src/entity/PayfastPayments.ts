import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { AuditableBase } from "./AuditableBase";

@Entity({ name: "PayfastPayments" })
export class PayfastPayment extends AuditableBase {
  // customer details
  /**
   * (string, 100 char). The customer’s first name.
   */
  @Column({nullable:true})
  name_first?: string;
  /**
   * (string, 100 char). The customer’s last name.
   */
  @Column({nullable:true})
  name_last?: string;
  /**
   * (string, 100 char). The customer’s email address.
   */
  
  @Column({nullable:true})
  email_address?: string;
  /**
   * (string, 100 char).
   * The customer’s valid cell number.
   * If the email_address field is empty, and cell_number provided,
   * the system will use the cell_number as the username and auto login the user,
   * if they do not have a registered account
   */
  
  @Column({nullable:true})
  cell_number?: string;

  //transaction details
  
  @Column({nullable:true})
  m_payment_id?: string;
  
  @Column()
  amount: number;
  
  @Column()
  item_name: string;
  /**
   * (string, 255 char).
   * The description of the item being charged for, or in the case of multiple items the order description.
   */
  @Column()
  item_description: string;
  /** (integer, 255 char)*/
  
  @Column({nullable:true})
  custom_int1?: number;
  /** (integer, 255 char)*/
  
  @Column({nullable:true})
  custom_int2?: number;
  /** (integer, 255 char)*/
  
  @Column({nullable:true})
  custom_int3?: number;
  /** (integer, 255 char)*/
  
  @Column({nullable:true})
  custom_int4?: number;
  /** (integer, 255 char)*/
  
  @Column({nullable:true})
  custom_int5?: number;
  /**(string, 255 char)*/
  
  @Column({nullable:true})
  custom_str1?: string;
  /**(string, 255 char)*/
  
  @Column({nullable:true})
  custom_str2?: string;
  /**(string, 255 char)*/
  
  @Column({nullable:true})
  custom_str3?: string;
  /**(string, 255 char)*/
  
  @Column({nullable:true})
  custom_str4?: string;
  /**(string, 255 char)*/
  
  @Column({nullable:true})
  custom_str5?: string;

  //transaction options
  
  @Column({nullable:true})
  email_confirmation?: boolean;
  
  @Column({nullable:true})
  confirmation_adress?: string;
  
  @Column({default:false})
  payment_confirmed: boolean;
}