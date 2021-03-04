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

    try {
      // Extraer el proyecto
      const { proyecto } = req.body;

      //comprobar si el proyecto existe
      const existeProyecto = await Proyecto.findById(proyecto)

      //si no hay proyecgto retornamos un error
      if(!existeProyecto) {
        res.status(404).send({msg: "Proyecto no encontrado"})
      }

      // Revisar si el proyecto actual pertenece al usuario autenticado
      if(existeProyecto.creador.toString() !== req.usuario.id) { // req.usuario viene the auth
        return res.status(401).json({msg: 'No autorizado'});
      }

      // Creamos la tarea
      const tarea = new Tarea(req.body);
      //Guardamos la tarea
      await tarea.save();
      res.json({tarea});

    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error con la tarea')
    }
}