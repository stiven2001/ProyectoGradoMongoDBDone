const mongoose = require("mongoose");

const rolSchema = new mongoose.Schema({
   nombre: { type: String, required: true, unique: true },
  permisos: [{ 
    type: String, 
     eunum: ["crear_usuario", "eliminar_usuario", "asignar_roles", "ver_roles", "ver_usuarios", "ver_reportes"]
  }]
}, { timestamps: true });

module.exports = mongoose.model("Rol", rolSchema);
