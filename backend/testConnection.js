
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./src/config/db');

const testConnection = async () => {
  await connectDB();

  console.log('Base de datos:', mongoose.connection.name);
  console.log('¡Conexión de Clothy funcionando!');

  await mongoose.disconnect();
};

testConnection();
