import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDTO 
{
    @IsString() @IsNotEmpty()
    type : string;
    
    @IsString() @IsNotEmpty()
    orderDateandTime : string;

    @IsString() @IsNotEmpty()
    deliveryDateandTime : string;

    @IsString() @IsNotEmpty()
    status : string;

}

