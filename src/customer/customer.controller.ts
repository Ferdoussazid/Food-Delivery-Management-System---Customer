import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put,Res,Session,UploadedFile,UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {  CustomerDTO, CustomerLoginDTO } from './customer.dto';
import { Customer } from './customer.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

interface FileParams {fileName : string;}
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

    @Get('/search/:status')
    getCustomerByStatus(@Param('status') status: string): Promise<Customer[]> 
    {
        return this.customerService.getCustomerByStatus(status);
    }

    @Post("/upload")
    @UseInterceptors(FileInterceptor('file' , {
        storage : diskStorage({
        destination : "./uploads",
        filename : (req , file , cb) => {
            cb(null , `${file.originalname}`)
        }
        })
    }))
    async uploadFile(@UploadedFile() file : any) {
        console.log(file);
        return "success";
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name:string, @Res() res) {
    res.sendFile(name,{ root: './upload' })
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
    

    @Post('/login')
    async login(@Body()customerDTO:CustomerDTO,@Session()session)
    {
    const res = await this.customerService.login(customerDTO);
    if(res)
    {
        session.email=customerDTO.email;
        return {message:"success"};
    }
    else
    {
        return {message:"failed"}
    } 
    
    }

    // @Get('obc/:id')
    // getOrdersByCustomer(@Param('id') id:number)
    // {
    //  return this.customerService.getOrdersByCustomer(id);
    // }
     

} 
