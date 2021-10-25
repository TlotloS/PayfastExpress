import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
/**
 * Auditable base (abstract entitiy class)
 */
export abstract class AuditableBase{
    /**
     * Primary key
     */
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    date_created: Date;
    
    // Need to manually update this because TypeOrm is broken
    @Column({nullable:true})
    date_modified: Date;

    @DeleteDateColumn()
    date_deleted: Date;
}