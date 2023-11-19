import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @UsePipes(new ValidationPipe())
    createCustomer(@Body() createCustomerDto : CustomerDTO)
    {
        return this.customerService.addCustomer(createCustomerDto);
    }

    @Delete('/:id')
    deleteCustomer(@Param('id', ParseIntPipe) id:number): Promise<void>
    {
        return this.customerService.deleteCustomer(id);
    }

    @Put('/:id')
    updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() customerInfo: CustomerDTO) 
    {
    return this.customerService.updateCustomer(id, customerInfo);
    }

    @Patch('/:id')
    updateCustomerStatus(@Param('id', ParseIntPipe) id:number, @Body() status: CustomerDTO)
    {
        return this.customerService.updateCustomerStatus(id, status);
    }

     

} 
