const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => { // req ==> lo q el usuario envia || res => lo q enviamos de vuelta
  try {
      let usuario;

      // crea el nuevo usuario
      usuario = new Usuario(req.body);

      // guardar el nuevo usuario
      await usuario.save();

      // mensaje de confirmacion
      res.send("Usuario creado correctamente");

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}