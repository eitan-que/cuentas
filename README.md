
# Cuentas

Este proyecto es una aplicación web para la gestión de cuentas personales, diseñada para llevar un registro de ingresos y egresos financieros. Está desarrollada utilizando **Node.js**, **Express** y **MongoDB** para el backend, con **React** para el frontend.

## Características

- **Gestión de cuentas**: Registra ingresos y egresos.
- **Balance financiero**: Muestra el saldo actual basado en las transacciones registradas.
- **Filtros**: Permite filtrar transacciones por tipo (ingreso/egreso) y fechas.
- **Visualización de datos**: Gráficas de resumen de los datos financieros.
- **Autenticación**: Maneja usuarios con registro y autenticación usando JWT.

## Tecnologías Utilizadas

- **Backend**:
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT para autenticación
  - bcrypt para hash de contraseñas
- **Frontend**:
  - React
  - React Router
  - Axios para solicitudes HTTP
  - Chart.js para las gráficas de datos
- **Despliegue**:
  - Docker
  - Heroku (o cualquier otro servicio de despliegue)

## Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (localmente o utilizando un servicio como MongoDB Atlas)
- [Docker](https://www.docker.com/) (opcional, para despliegue con contenedores)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/eitan-que/cuentas.git
   cd cuentas
   ```

2. Instala las dependencias del backend y frontend:

   ```bash
   # Instalar dependencias del backend
   cd backend
   npm install

   # Instalar dependencias del frontend
   cd ../frontend
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en la carpeta `backend`. Aquí tienes un ejemplo:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cuentas
   JWT_SECRET=your_jwt_secret
   ```

4. Inicia la aplicación:

   ```bash
   # Iniciar el backend
   cd backend
   npm start

   # Iniciar el frontend
   cd ../frontend
   npm start
   ```

5. Abre tu navegador en `http://localhost:3000` para ver la aplicación.

## Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión con una existente.
2. **Registro de transacciones**: Añade ingresos o egresos a tu cuenta.
3. **Visualización del balance**: Consulta el saldo actual y las gráficas.
4. **Filtrar datos**: Filtra tus transacciones por tipo o rango de fechas.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

### Backend

```bash
npm run dev
```

Inicia el servidor en modo desarrollo con nodemon.

### Frontend

```bash
npm start
```

Inicia la aplicación en modo desarrollo.

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
