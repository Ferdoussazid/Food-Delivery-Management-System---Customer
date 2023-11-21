import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put,Req,Res,Session,UnauthorizedException,UploadedFile,UseGuards,UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {  CustomerDTO, CustomerLoginDTO } from './customer.dto';
import { Customer } from './customer.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { Order } from 'src/order/order.entity';
import { SessionGuard } from './session.guard';

interface FileParams {fileName : string;}
@Controller('customer')
export class CustomerController 
{
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

    @Get('/search/:status')
    getCustomerByStatus(@Param('status') status: string): Promise<Customer[]> 
    {
        return this.customerService.getCustomerByStatus(status);
    }

    @Post("/upload")
    @UseInterceptors(FileInterceptor('file' , {
        storage : diskStorage({
        destination : "src/customer/uploads",
        filename : (req , file , cb) => {
            cb(null , `${file.originalname}`)
        }
        })
    }))
    async uploadFile(@UploadedFile() file : any) {
        console.log(file);
        return "success";
    }

    @Get('/getimage/:filename')
    getImages(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: 'src/customer/uploads' });
    }



    @Post()
    @UsePipes(new ValidationPipe())
    createCustomer(@Body() createCustomerDto : CustomerDTO)
    {
        return this.customerService.createCustomer(createCustomerDto);
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
    
    @Get('/getAllOrdersWithCustomer')
    async getAllOrdersWithCustomer(): Promise<Order[]> {
    return this.customerService.getAllOrderswithcustomer();
    }

    @Get('/getOrdersByCustomer/:customerid')
    async getOrdersByCustomer(@Param('customerid') customerid: number): Promise<Customer[]> {
    return this.customerService.getOrdersByCustomer(customerid);
    }

    @Post('login')
    signIn(@Body() mydata: CustomerLoginDTO, @Session() session) {
        const result = this.customerService.signIn(mydata);
        if (result) {
            session.email = mydata.email;
            console.log(session.email);
        }

        return 'Logged In Successfully. Hashed Password matched and session has been stored' ;

    }

    @Post('/logout')
    signout( @Req() req) {
        if (req.session.destroy()) {
            return 'Logged Out Successfully.';
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    }
  
    
    

} 
