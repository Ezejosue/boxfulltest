import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { prisma } from '../lib/prisma';
import { Order, Package } from '@prisma/client';

@Injectable()
export class OrdersService {
  async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    return prisma.order.create({
      data: {
        ...createOrderDto,
        userId,
      },
    });
  }

  async addPackageToOrder(orderId: string, createPackageDto: CreatePackageDto): Promise<Package> {
    // Verificar si la orden existe
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return prisma.package.create({
      data: {
        ...createPackageDto,
        orderId,
      },
    });
  }

  async updateOrderStatus(orderId: string, userId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    // Verificar si la orden existe y pertenece al usuario
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found or does not belong to user`);
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async getOrderById(orderId: string, userId: string): Promise<Order & { packages: Package[] }> {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        packages: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found or does not belong to user`);
    }

    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: {
        packages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async removePackageFromOrder(orderId: string, packageId: string, userId: string): Promise<void> {
    // Verificar si la orden existe y pertenece al usuario
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found or does not belong to user`);
    }

    await prisma.package.delete({
      where: {
        id: packageId,
        orderId,
      },
    });
  }
}
