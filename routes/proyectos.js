const exress = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');


// Crea Proyectos
// endpoint => api/proyectos
router.post('/',
  [],
  proyectoController.crearProyecto
);
module.exports = router;