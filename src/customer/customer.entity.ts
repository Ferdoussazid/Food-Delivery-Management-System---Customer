import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('Customer')
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    name: string

    @Column({nullable: false})
    address: string

    @Column({nullable: false, unique: true})
    phone: string

    @Column({nullable: false, unique: true})
    email: string
    
    @Column({nullable: false})
    status: string

}

@Entity("CustomerProfile")
export class CustomerProfile 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ type: "varchar", length: 150 })
    photo: string;
}