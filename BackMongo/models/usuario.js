const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   rol: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Rol", 
    required: true 
  },
  edad: { type: Number } // opcional
}, { timestamps: true });

// Encriptar contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para validar contraseña
usuarioSchema.methods.compararContraseña = function (password) {
  return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("Usuario", usuarioSchema);
