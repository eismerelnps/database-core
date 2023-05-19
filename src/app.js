const express = require('express');
const { dbConnect } = require('./database/config');

// Configuración del servidor Express
const app = express();
app.use(express.json());

// Conexión a la base de datos
dbConnect();

// Rutas y controladores
const productRouter = require('./routes/productRoutes');
app.use('/api/v1/products', productRouter);

// Puerto de escucha del servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
