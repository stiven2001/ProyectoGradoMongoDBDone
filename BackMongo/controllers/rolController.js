const Rol = require("../models/rol");
const Usuario = require("../models/usuario");
const reportes = require("../models/reportesAdmin")


// Crear rol
exports.crearRol = async (req, res) => {
  try {
    const { nombre, permisos } = req.body;

    const nuevoRol = new Rol({ nombre, permisos });
    await nuevoRol.save();

    res.json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Asignar permisos a un rol existente
exports.asignarPermisos = async (req, res) => {
  try {
    const { id } = req.params;
    const { permisos } = req.body;

    const rol = await Rol.findByIdAndUpdate(id, { $set: { permisos } }, { new: true });
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // validar que el rol exista
    const rolEncontrado = await Rol.findOne({ nombre: rol });
    if (!rolEncontrado) {
      return res.status(400).json({ error: "Rol no válido" });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: contraseña,
      rol: rolEncontrado._id
    });

    await nuevoUsuario.save();
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Listar usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
    try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
exports.verreportes = async (req, res) => {
  try {
    const logs = await reportes.find().sort({ fecha: -1 }).limit(20); // últimos 20 registros
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

