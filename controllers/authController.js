const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

  // Revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if(!usuario) {
      return res.status(400).json({msg: "El usuario no existe."});
    }

    // Si el email existe revisar su password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if(!passCorrecto) {
      return res.status(400).json({msg: "Password incorrecto"});
    }
    // Si todo es correcto Crear y firmar el JWT
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
  }
}