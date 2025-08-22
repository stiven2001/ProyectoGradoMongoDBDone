const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  accion: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', actividadSchema);
