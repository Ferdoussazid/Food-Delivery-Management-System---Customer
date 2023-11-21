import { Order } from "src/order/order.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity('Customer')
export class Customer 
{

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

    @Column({nullable:false})
    password: string
    
    @Column({nullable: false})
    status: string

    @OneToMany(() => Order, (order) =>order.customer, { cascade: true })
    orders : Customer[];

}
