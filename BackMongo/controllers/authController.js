const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const Rol = require("../models/rol");

const JWT_SECRET = process.env.JWT_SECRET || "secretstiven";

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo }).populate("rol");
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const esValida = await usuario.compararContraseña(contraseña);
    if (!esValida) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol.nombre },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Registro de usuario
exports.signup = async (req, res) => {
  try {
    const { nombre, correo, contraseña, edad, rol } = req.body;

    // Verificar si el usuario ya existe
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Crear usuario (se encripta con el pre-save del schema)
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: contraseña, // se encripta automáticamente en el pre("save")
      edad,
      rol
    });

    await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

