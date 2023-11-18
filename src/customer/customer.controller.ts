import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {  CustomerDTO } from './customer.dto';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get()
    getAllCustomer() 
    {
        return this.customerService.getAllCustomer();
    }

    @Get('/:id')
    getCustomerById(@Param('id', ParseIntPipe) id:number): Promise<Customer>
    {
        return this.customerService.getCustomerById(id);
    }

    @Post()
    createCustomer(@Body() createCustomerDto : CustomerDTO)
    {
        return this.customerService.addCustomer(createCustomerDto);
    }

    @Delete('/:id')
    deleteCustomer(@Param('id', ParseIntPipe) id:number): Promise<void>
    {
        return this.customerService.deleteCustomer(id);
    }

     

} 
