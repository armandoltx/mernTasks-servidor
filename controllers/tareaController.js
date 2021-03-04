const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto'); // como las tareas pertenecen a los proyectos vamos a importar el modelo de los proyectos.
// Antes de crear una tarea, tenemos q asegurarnos de q el proyecto exista.
const { validationResult } = require('express-validator');

// Crea Tarea
exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
}