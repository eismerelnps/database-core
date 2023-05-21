//src/app.js


const express = require('express');
const { dbConnect } = require('./database/config');

const authController = require('./controllers/authController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

// Configuración del servidor Express
const app = express();

app.use(express.json());


app.use('/api/v1/users', userRouter);

//authentication route
app.use('/api/v1/login', userRouter);

// Rutas protegidas que requieren autenticación
app.use('/api/v1/products', productRouter);

// Middleware de error para manejar accesos no autorizados
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Acceso no autorizado' });
  } else {
    next(err);
  }
});
// Conexión a la base de datos
dbConnect();

// Puerto de escucha del servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});


/*
//old code
// Conexión a la base de datos
dbConnect();

/*
// Rutas y controladores
app.use('/api/v1/products', productRouter);


// Puerto de escucha del servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
*/