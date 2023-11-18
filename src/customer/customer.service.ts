import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO, CustomerLoginDTO, CustomerUpdateDTO } from './customer.dto';
import { Customer } from './customer.entity';
import { Repository, } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CustomerService 
{

   constructor(@InjectRepository(Customer) 
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

   async addCustomer(customerDto: CustomerDTO): Promise<Customer> 
   {
      return this.customerRepo.save(customerDto);
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


}
