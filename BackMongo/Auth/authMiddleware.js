const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const Rol = require("../models/rol");

const JWT_SECRET = process.env.JWT_SECRET || "secretstiven";

// Verificar token
const autenticar = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token requerido" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userRol = decoded.rol; // ya queda disponible
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

// Verificar permisos específicos
const verificarPermiso = (permiso) => {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findById(req.userId).populate("rol");
      if (!usuario || !Array.isArray(usuario.rol.permisos) || !usuario.rol.permisos.includes(permiso)) {
        return res.status(403).json({ error: "No tienes permisos para esta acción" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { autenticar, verificarPermiso };
