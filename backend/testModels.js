
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Category = require('./src/models/Category');

const testModels = async () => {
  try {
    await connectDB();

    // Crear una categoría de prueba
    const category = await Category.create({
      name: 'CategoriaPrueba_' + Date.now(),
      description: 'Prueba de MongoDB de Clothy'
    });

    console.log('Categoría creada:', category.name);

    // Comprobar que se ha guardado
    const savedCategory = await Category.findById(category._id);

    if (!savedCategory) {
      throw new Error('No se encontró la categoría');
    }

    console.log('Categoría encontrada correctamente');

    // Eliminar la categoría de prueba
    await Category.findByIdAndDelete(category._id);

    console.log('Categoría de prueba eliminada');
    console.log('¡Prueba completada correctamente!');
  } catch (error) {
    console.error('Error en la prueba:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

testModels();
