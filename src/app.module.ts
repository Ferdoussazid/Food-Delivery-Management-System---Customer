import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';

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
     } ), OrderModule,
  ],
  
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
