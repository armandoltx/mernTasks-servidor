const express = require('express');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

// // definir la pag principal
// app.get('/', (req, res) => {
//   res.send('Hola Mundo')
// });
// // si tenemos esto bien significa q el servidor esta corriendo correctamente

// arrancar el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})