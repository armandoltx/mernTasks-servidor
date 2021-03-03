const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea Proyectos
// endpoint => api/proyectos
router.post('/',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.crearProyecto
);

// Obtener todos los proyectos
router.get('/',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  proyectoController.obtenerProyectos
);

// Actualizar un proyecto via ID
router.put('/:id',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.acutalizarProyecto
);

module.exports = router;