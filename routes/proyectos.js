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

router.get('/',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  proyectoController.obtenerProyectos
);

module.exports = router;