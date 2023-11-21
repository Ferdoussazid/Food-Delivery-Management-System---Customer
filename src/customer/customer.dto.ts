import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    
    email: string;
    password: string;
}