const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


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