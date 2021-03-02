const Proyecto = require('../models/Proyecto');




exports.crearProyecto = async (req, res) => {
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