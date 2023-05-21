// userController.js

const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();





// Controlador para autenticar un usuario
exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    //Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea una nueva instancia del modelo User con los datos del usuario
    const newUser = new User({ username, password: hashedPassword, email });

    // Guarda el usuario en la base de datos
    await newUser.save();

    // Envía una respuesta con el usuario creado
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};



// //User authtentication controller
// exports.login = async (req, res) => {
//     try {
//         const { username, password, email } = req.body;

//         //search user on db
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         //Check password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid){
//             return res.status(401).json({ message: 'Contraseña incorrecta' });
//         }
//         //Generate authentication token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//         //Send response with authentication token
//         res.status(200).json({ message: 'Autenticación exitosa', token });
//     }catch(error){
//         res.status(500).json({ message: 'Error al autenticar el usuario', error });
//     }
// }














//controlador para autenticar un usuario

//Mock de usuario (puedes reemplazarlo con una base de datos real)
// const users = [
//   { id: 1, username: 'user1', password: '$2b$10$2mtr14eM4KYcSfI1sjqXyeLmyfj4Bv2ANrVTudM2hYzXWAC2PYZMy' } // Contraseña: secret123
// ];



// Función para verificar las credenciales del usuario y generar un token JWT
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar al usuario en la base de datos
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Generar el token JWT
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Enviar el token en la respuesta
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error al autenticar el usuario', error });
    }
  };

// Middleware de autenticación
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Agregar la información del usuario autenticado al objeto `req`
    req.user = decoded;
    next();
  });
};

