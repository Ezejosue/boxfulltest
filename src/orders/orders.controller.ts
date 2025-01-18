import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(user.id, createOrderDto);
  }

  @Post(':id/packages')
  addPackage(
    @Param('id') orderId: string,
    @Body() createPackageDto: CreatePackageDto,
  ) {
    return this.ordersService.addPackageToOrder(orderId, createPackageDto);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: User,
    @Param('id') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(
      orderId,
      user.id,
      updateOrderStatusDto,
    );
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.ordersService.getUserOrders(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') orderId: string) {
    return this.ordersService.getOrderById(orderId, user.id);
  }

  @Delete(':orderId/packages/:packageId')
  removePackage(
    @CurrentUser() user: User,
    @Param('orderId') orderId: string,
    @Param('packageId') packageId: string,
  ) {
    return this.ordersService.removePackageFromOrder(
      orderId,
      packageId,
      user.id,
    );
  }
}
