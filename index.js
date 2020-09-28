const express = require('express');

// crear el servidor
const app = express();

// puerto de la app
const PORT = process.env.PORT || 4000;

// // definir la pag pprincipal
// app.get('/', (req, res) => {
//   res.send('Hola Mundo')
// });
// // si tenemos esto bien significa q el servidor esta corriendo correctamente

// arrancar el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})