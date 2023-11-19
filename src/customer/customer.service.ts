import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO, CustomerLoginDTO } from './customer.dto';
import { Customer } from './customer.entity';
import { Repository, } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CustomerService 
{

   constructor(
   @InjectRepository(Customer) 
   private customerRepo : Repository<Customer> ){}




   async getAllCustomer(): Promise<Customer[]> 
   {
      return this.customerRepo.find();   
   }

   async getCustomerById(id:number) : Promise<Customer>
   {
      const found = await this.customerRepo.findOneBy({id});

      if(!found)
      {throw new HttpException ('Customer with searched Id not found', HttpStatus.NOT_FOUND)}
      else
      return found;
   }

   async getCustomerByStatus(status): Promise<Customer[]> 
   {
      return await this.customerRepo.findBy({status});
   }
  


   async createCustomer(customerDTO:CustomerDTO):Promise<Customer[]>
  { 
    
    const password = customerDTO.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    customerDTO.password = hashedPassword;
    await this.customerRepo.save(customerDTO);
    return this.customerRepo.find();
  }

   async deleteCustomer(id: number): Promise<void>
   {
      const { affected } = await this.customerRepo.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    else
      throw new HttpException(`Customer with ID ${id} Deleted Successfully`, HttpStatus.ACCEPTED)
   }

   async updateCustomer(id: number, customerDTO: CustomerDTO): Promise<Customer> 
   {
      const customer = await this.customerRepo.findOne({ where: { id } });

      if (!customer) 
      {
         throw new Error(`Customer with ID ${id} not found.`);
      }

      customer.name = customerDTO.name;
      customer.address = customerDTO.address;
      customer.phone = customerDTO.phone;
      customer.email = customerDTO.email;
      return this.customerRepo.save(customer);
      
    }

   async updateCustomerStatus(id:number, customerDTO:CustomerDTO): Promise<Customer>
   {
      const updateStatus = await this.customerRepo.findOne({where: {id}});

      if(!updateStatus)
      {
         throw new NotFoundException(`Customer not found`);
      }

      updateStatus.status = customerDTO.status;
      return this.customerRepo.save(updateStatus);
   }


   // async getOrdersByCustomer(customerid: number): Promise<Customer[]> {
   //    return this.customerRepo.find({
   //        where: { id: customerid },
   //        relations: {
   //            orders: true,
   //        },
   //    });
   // }


}

