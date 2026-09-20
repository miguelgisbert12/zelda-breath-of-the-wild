# Zelda BOTW Compendium

Aplicación web Full-Stack realizada para el TFM de NETT Digital School que permite explorar el Hyrule Compendium de
The Legend of Zelda: Breath of the Wild.

Incluye un Front-Office público y un Back-Office privado para gestionar
usuarios y contenido.

## Tecnologías

- React + Vite
- React Router
- Node.js + Express
- SQLite + Prisma
- JWT y cookies HttpOnly
- bcryptjs
- Zod
- Hyrule Compendium API v3
- HTML y CSS responsive

## Funcionalidades

### Front-Office

- Página de inicio.
- Navegación por categorías.
- Búsqueda global.
- Paginación.
- Fichas individuales.
- Diseño responsive.
- Consumo de la API pública de Hyrule.

### Back-Office

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Roles de usuario y administrador.
- Gestión de usuarios.
- Importación del compendio desde la API.
- Publicación y ocultación de entradas.
- Eliminación de entradas.
- Cierre de sesión.

## Instalación

1- Clonar el repositorio e instalar las dependencias:

npm install

2- Crear un archivo .env en la raíz:

DATABASE_URL="file:./dev.db"
JWT_SECRET="una-clave-secreta-larga"
PORT=3000

3- Crear la base de datos y generar Prisma:

npx prisma migrate dev
npx prisma generate

4- Para iniciar frontend y backend al mismo tiempo:

npm run dev:full

(También pueden iniciarse por separado):

npm run dev
npm run server

5- La aplicación estará disponible en:

http://localhost:5173

6- El backend estará disponible en:

http://localhost:3000


## Acceso y modificaciones internas

### Acceso al Back-Office

1- Entrar en /login o /acceso.
2- Crear una cuenta.
3- Cambiar manualmente el campo role a admin usando Prisma Studio:

npx prisma studio

4- Volver a iniciar sesión.
5- Acceder a /admin.

Desde el Back-Office se puede importar el contenido completo mediante el botón
"Importar desde API".

### API interna principal

Autenticación:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Usuarios:

GET    /api/users
PATCH  /api/users/:id
DELETE /api/users/:id

(Estas rutas requieren permisos de administrador)

Contenido:

GET    /api/entries
GET    /api/entries/:id
GET    /api/entries/admin/all
POST   /api/entries/import
POST   /api/entries
PATCH  /api/entries/:id
DELETE /api/entries/:id

(Estas rutas requieren autenticación y rol de administrador)

## Comprobaciones

npm run lint
npm run build

## Base de datos y seguridad

Los archivos .env y *.db están excluidos mediante .gitignore.
No deben subirse credenciales, claves JWT ni la base de datos local al repositorio.