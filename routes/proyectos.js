const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');


// Crea Proyectos
// endpoint => api/proyectos
router.post('/',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  proyectoController.crearProyecto
);

router.get('/',
  auth, // verifica lo q pasa en auth y luego va al siguiente middleware, en este caso el controller
  proyectoController.crearProyecto
);

module.exports = router;