const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar Cors
app.use(cors());

// Habilitar express.json q nos va a permitir leer datos q el usuario coloque en el formulario
app.use(express.json({ extend: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// // definir la pag principal
// app.get('/', (req, res) => {
//   res.send('Hola Mundo')
// });
// // si tenemos esto bien significa q el servidor esta corriendo correctamente

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// arrancar el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})