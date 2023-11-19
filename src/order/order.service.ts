import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderDTO } from './order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService 
{
  constructor (@InjectRepository(Order)
  private orderRepo : Repository<Order>){}




  async getAllOrder(): Promise<Order[]> 
  {
     return this.orderRepo.find();   
  }

   async getOrderById(id:number) : Promise<Order>
   {
      const found = await this.orderRepo.findOneBy({id});

      if(!found)
      {throw new HttpException ('Order with searched Id not found', HttpStatus.NOT_FOUND)}
      else
      return found;
   }

   async createOrder(orderDTO:OrderDTO): Promise<Order> 
    {
      return this.orderRepo.save(orderDTO);
    }

   async getOrderByStatus(status): Promise<Order[]> 
   {
      return await this.orderRepo.findBy({status});
   }

   async deleteOrder(id: number): Promise<void>
   {
      const { affected } = await this.orderRepo.delete(id);

      if (affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
      }

      else
        throw new HttpException(`Order with ID ${id} Deleted Successfully`, HttpStatus.ACCEPTED)
    }

    async updateOrder(id: number, orderDTO: OrderDTO): Promise<Order> 
    {
       const order = await this.orderRepo.findOne({ where: { id } });
 
       if (!order) 
       {
          throw new Error(`Order with ID ${id} not found.`);
       }
 
       order.deliveryDateandTime = orderDTO.deliveryDateandTime;
       order.orderDateandTime = orderDTO.orderDateandTime;
       order.type = orderDTO.type;
       return this.orderRepo.save(order);
       
     }
  
     async updateOrderStatus(id:number, orderDTO:OrderDTO): Promise<Order>
     {
        const updateStatus = await this.orderRepo.findOne({where: {id}});
  
        if(!updateStatus)
        {
           throw new NotFoundException(`Order not found`);
        }
  
        updateStatus.status = orderDTO.status;
        return this.orderRepo.save(updateStatus);
     }

     async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
      return this.orderRepo.find({ where: { customer: { id: customerId } } });
      }

}
