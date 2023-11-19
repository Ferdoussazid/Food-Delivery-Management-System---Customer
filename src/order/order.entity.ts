import { Customer } from 'src/customer/customer.entity';
import{PrimaryGeneratedColumn,Entity,Column, ManyToOne, JoinColumn} from 'typeorm';


@Entity("Order")
export class Order
{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    type : string;

    @Column()
    orderDateandTime : string;

    @Column()
    deliveryDateandTime : string;

    @Column()
    status : string;
    
    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer;

}