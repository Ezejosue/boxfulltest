import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos
  await prisma.package.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Base de datos limpiada');

  // Crear usuarios de prueba
  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      password,
      phone: '+503 7123 4567',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'María',
      lastName: 'García',
      email: 'maria@example.com',
      password,
      phone: '+503 7890 1234',
    },
  });

  console.log('👥 Usuarios creados');

  // Crear órdenes para el primer usuario
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      pickupAddress: 'Colonia Las Magnolias Calle ruta militar #1, San Miguel',
      scheduledDate: new Date('2025-01-20'),
      firstName: 'Juan',
      lastName: 'Pérez',
      phone: '+503 7123 4567',
      email: 'juan@example.com',
      deliveryAddress: 'Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter',
      department: 'San Salvador',
      municipality: 'San Salvador',
      referencePoint: 'Cerca de redondel Árbol de la Paz',
      instructions: 'Llamar antes de entregar',
      status: 'PENDING',
    },
  });

  // Agregar paquetes a la primera orden
  await prisma.package.create({
    data: {
      orderId: order1.id,
      lengthCm: 15,
      heightCm: 15,
      widthCm: 15,
      weightLb: 2,
      content: 'iPhone 14 Pro Max',
    },
  });

  await prisma.package.create({
    data: {
      orderId: order1.id,
      lengthCm: 20,
      heightCm: 10,
      widthCm: 10,
      weightLb: 1,
      content: 'Accesorios de iPhone',
    },
  });

  // Crear orden para el segundo usuario
  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      pickupAddress: 'Residencial Las Palmas, Calle Principal #123',
      scheduledDate: new Date('2025-01-21'),
      firstName: 'María',
      lastName: 'García',
      phone: '+503 7890 1234',
      email: 'maria@example.com',
      deliveryAddress: 'Centro Comercial Galerías, Local #45',
      department: 'San Salvador',
      municipality: 'San Salvador',
      referencePoint: 'Frente a farmacia principal',
      instructions: 'Entregar en horario de oficina',
      status: 'PROCESSING',
    },
  });

  // Agregar paquete a la segunda orden
  await prisma.package.create({
    data: {
      orderId: order2.id,
      lengthCm: 30,
      heightCm: 20,
      widthCm: 25,
      weightLb: 5,
      content: 'Laptop Dell XPS 13',
    },
  });

  console.log('📦 Órdenes y paquetes creados');

  // Resumen de datos creados
  const usersCount = await prisma.user.count();
  const ordersCount = await prisma.order.count();
  const packagesCount = await prisma.package.count();

  console.log('\n📊 Resumen de datos creados:');
  console.log(`Usuarios: ${usersCount}`);
  console.log(`Órdenes: ${ordersCount}`);
  console.log(`Paquetes: ${packagesCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
