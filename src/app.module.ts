import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CustomerModule,TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'crave_crafter',
     autoLoadEntities: true,
     synchronize: true,
     } ),
  ],
  
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
