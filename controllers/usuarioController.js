const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => { // req ==> lo q el usuario envia || res => lo q enviamos de vuelta

  // hacemos destructuring para extraer emaily password
  const { email, password } = req.body;

  try {
      // Revisar q el usuario registrado sea unico
      let usuario = await Usuario.findOne({ email }); // buscar un usuario con este email

      if(usuario) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }

      // crea el nuevo usuario
      usuario = new Usuario(req.body);

      // Hashear el password
      const salt = await bcryptjs.genSalt(10); // salt hace q si 2 usuarios tienen el mismo pass tengan != hash
      usuario.password = await bcryptjs.hash(password, salt);

      // guardar el nuevo usuario
      await usuario.save();

      // mensaje de confirmacion
      res.json({ msg: "Usuario creado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}