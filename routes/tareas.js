const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth'); // usuario tiene q estar autenticado
const { check } = require('express-validator');// vamos a tener validacion.


// Crear Tarea
// endpoint => api/tareas
router.post('/',
  auth,
  [
    check('nombre', 'El nombre de la Tarea es obligatorio').not().isEmpty(),
    check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
  ],
  tareaController.crearTarea
);

// Obtener las tareas por proyecto
router.get('/',
  auth,
  tareaController.obtenerTareas
);

// Actualizar un proyecto via ID
router.put('/:id',
  auth,
  tareaController.actualizarTarea
);

// eliminar una tarea
router.delete('/:id',
  auth,
  tareaController.eliminarTarea
);

module.exports = router;