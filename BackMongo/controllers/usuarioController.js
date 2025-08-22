const Usuario = require("../models/usuario");


exports.obtenerMiPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).populate("rol");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarMiPerfil = async (req, res) => {
  try {
    const { nombre, correo, edad } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.userId,
      { nombre, correo, edad },
      { new: true }
    );
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cambiarPassword = async (req, res) => {
  try {
    const { contraseña } = req.body;
    const usuario = await Usuario.findById(req.userId);
    usuario.password = contraseña; // se encripta automáticamente en pre-save
    await usuario.save();
    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


