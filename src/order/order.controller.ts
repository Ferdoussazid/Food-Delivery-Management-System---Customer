import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrder()
  {
    return this.orderService.getAllOrder();
  }

  @Get('/:id')
  getCustomerById(@Param('id', ParseIntPipe) id:number): Promise<Order>
  {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createOrder(@Body() createOrderDto: OrderDTO) 
  {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get('/search/:status')
  getOrderByStatus(@Param('status') status: string): Promise<Order[]> 
  {
    return this.orderService.getOrderByStatus(status);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id', ParseIntPipe) id:number): Promise<void>
  {
    return this.orderService.deleteOrder(id);
  }

  @Put('/:id')
  updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() orderInfo: OrderDTO) 
  {
    return this.orderService.updateOrder(id, orderInfo);
  }

  @Patch('/:id')
    updateOrderStatus(@Param('id', ParseIntPipe) id:number, @Body() status: OrderDTO)
    {
      return this.orderService.updateOrderStatus(id, status);
    }

    

}
