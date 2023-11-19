import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerDTO 
{
   
   @IsString() 
   name: string;
   @IsString() @IsNotEmpty()
   address: string;
   @IsString() @IsNotEmpty()
   phone: string;
   @IsEmail() @IsNotEmpty()
   email: string;
   @IsString() @IsNotEmpty()
   password:string;
   @IsString() @IsNotEmpty()
   status: string;

}


export class CustomerLoginDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}


export class CustomerUpdateDTO {

    name: string;
    email: string;
    password: string;
    phone: number;

}