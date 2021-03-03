const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crear Proyetos
exports.crearProyecto = async (req, res) => {

  // Revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }


  try {
    // Crear un nuevo Proyecto y guardarlo
    const proyecto = new Proyecto(req.body);

    //Guardar el usuario/ creador via JWT
    proyecto.creador = req.usuario.id //req.usuario viene del middleware el id viene del payload en el controller de usuario

    //Guardamos el proyecto
    proyecto.save();
    res.json(proyecto);


  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error con los proyectos");
  }
}

// Obtener los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    // guardamos los proyectos en un array
    const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});

    // Enviamos los proyectos en la respuesta
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al listar los proyectos");
  }
}

// Actualizar un proyeto
exports.acutalizarProyecto = async (req, res) => {

   // Revisar si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()) {
     return res.status(400).json({ errores: errores.array() });
   }

   // Extraer la informacion del proyecto
   const { nombre } = req.body;
   const nuevoProyecto = {};

   if(nombre) {
     nuevoProyecto.nombre = nombre;
   }


  try {

    // Revisar el ID
    // console.log(req.params.id); // nos manda a consola el id de la peticion
    let proyecto = await Proyecto.findById(req.params.id);

    // Si el proyecto existe o no
    if(!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Verificar el creador del proyecto
    if(proyecto.creador.toString() !== req.usuario.id) { // req.usuario viene the auth
      return res.status(401).json({msg: 'No autorizado'});
    }

    // Actualizar el proyecto
    proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});

    res.json({proyecto});

  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo actualizar el proyecto.");
  }
}