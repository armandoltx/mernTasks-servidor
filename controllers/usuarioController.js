const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => { // req ==> lo q el usuario envia || res => lo q enviamos de vuelta

  // Revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

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

      // Crear y firmar el JWT
      // consiste en 2 partes, 1 se crea el JWT con el payload y luego hay q firmarlo
      // crear el JWT
      const payload = {
        usuario: {
          id: usuario.id
        }
      };

      //firmar el JWT para ello pasamos el payload y la palabra secreta q creamos en .env
      // la 2 pare es la configuracion
      jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 3600 // expira en una hora, hay q ponerlo en segundos
      }, (error, token) => {
        if(error) throw error;

        // mensaje de confirmacion
        res.json({ token });
      })


  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}