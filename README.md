# API Boxfull - Prueba Técnica

API REST desarrollada con NestJS para la prueba técnica de Boxfull. Permite gestionar órdenes de envío y paquetes.

## Descripción

Esta API proporciona endpoints para:
- Gestión de usuarios (registro y autenticación)
- Creación y seguimiento de órdenes de envío 
- Administración de paquetes asociados a las órdenes
- Actualización de estados de envíos

## Configuración del proyecto

```bash
# 1. Instalación de dependencias
$ pnpm install

# 2. Configurar variables de entorno
$ cp .env.example .env
# Editar .env con tus credenciales de MongoDB

# Si no deseas usar Docker, configura la URL de la base de datos en el archivo .env:
# Ejemplo de configuración para MongoDB local sin autenticación:
# DATABASE_URL="mongodb://localhost:27017/mydatabase"
# Ejemplo de configuración para MongoDB con autenticación:
# DATABASE_URL="mongodb://usuario:contraseña@localhost:27017/mydatabase"
# Ejemplo de configuración para MongoDB Atlas:
# DATABASE_URL="mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/mydatabase"

# 3. Iniciar MongoDB con Docker (opcional)
$ cd docker
$ docker-compose up -d

# 4. Configurar el replica set de MongoDB (si usas Docker)
$ docker exec -it my-mongo mongosh
# Dentro de mongosh ejecutar:
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
})
# Escribir 'exit' para salir de mongosh

# 5. Generar el cliente Prisma
$ pnpm prisma generate

# 6. Sincronizar el esquema con la base de datos
$ pnpm prisma db push

# 7. Poblar la base de datos con datos de prueba
$ pnpm prisma db seed
```

## Ejecución

```bash
# Desarrollo
$ pnpm run start:dev

# Producción
$ pnpm run start:prod
```

## Testing

```bash 
# Tests unitarios
$ pnpm run test

# Tests e2e
$ pnpm run test:e2e

# Cobertura de tests
$ pnpm run test:cov
```

## Probar Endpoints

Para probar los endpoints, puedes importar la colección de Insomnia proporcionada en [Insomnia_2025-01-18.json](Insomnia_2025-01-18.json).

## Stack Tecnológico

- NestJS - Framework backend
- Prisma - ORM
- MongoDB - Base de datos
- Jest - Testing
- JWT - Autenticación

## Hecho con ❤️ por Josue Avalos