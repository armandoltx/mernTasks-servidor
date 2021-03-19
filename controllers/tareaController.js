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
      res.status(500).send('Hubo un error con la tarea');
    }
}

// Obtener las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
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

    // Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }); // este proyecto viene de la parte donde lo hemos extraido
    // Enviamos las tareas al response
    res.json({ tareas });



  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error obteniendo las tareas');
  }
}

// Actualizar Tarea
exports.actualizarTarea = async (req, res) => {
  try {
    // Extraer el proyecto, el nombre de la tarea y su estado
    const { proyecto, nombre, estado } = req.body;

    // revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    // Si la tarea no existe
    if(!tarea) {
      return res.status(404).json({msg: 'No existe esa Tarea'});
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if(existeProyecto.creador.toString() !== req.usuario.id) { // req.usuario viene the auth
      return res.status(401).json({msg: 'No autorizado'});
    }

    // Crear un proyecto con la nueva informacion
    const nuevaTarea = {}
    if(nombre) nuevaTarea.nombre = nombre;
    if(estado) nuevaTarea.estado = estado;

    // Actualizar y guardar la tarea
     tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
     res.json({tarea});

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error actualizando la tarea');
  }
}

exports.eliminarTarea = async (req, res) => {
  try {
    // Extraer el proyecto
    const { proyecto } = req.body;

    // revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    // Si la tarea no existe
    if(!tarea) {
      return res.status(404).json({msg: 'No existe esa Tarea'});
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if(existeProyecto.creador.toString() !== req.usuario.id) { // req.usuario viene the auth
      return res.status(401).json({msg: 'No autorizado'});
    }

    // Eliminar
    await Tarea.findOneAndRemove({_id: req.params.id});
    res.json({msg: 'Tarea eliminada'});

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error actualizando la tarea');
  }
}