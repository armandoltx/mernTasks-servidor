const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId, // es el id del usuario. Se puede ver en Compass el Id del usuario => _id:ObjectId("444fgfrsdd444dfad")
    ref: 'Usuario' //tiene q ser el nombre del modelo q tenga en module.exports = mongoose.model(.....);
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);