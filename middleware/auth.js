const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  // Leer el token del header
  const token = req.header('x-auth-token');

  // Revisar si hay token
  if(!token) {
    return res.status(401).json({msg: "No hay Token, permiso no valido"});
  }
  // Validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA)
    req.usuario = cifrado.usuario // viene del payload de usuario controller
    next();

  } catch (error) {
    res.status(401).json({msg: "Token no valido"});
  }
}



// Cada vez q se envien peticiones hacia proyectos, ya sean post, get... tenemos q verificar q el usuario esta autenticado
// es por eso q creamos los middleware y agregarlo todas las veces q lo necesitamos.