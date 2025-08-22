const express = require("express");
const { autenticar, verificarPermiso } = require("../Auth/authMiddleware");
const { obtenerMiPerfil, actualizarMiPerfil,  cambiarPassword} = require("../controllers/usuarioController");

const router = express.Router();

// Rutas para usuarios normales
router.get("/mi-perfil", autenticar, obtenerMiPerfil);
router.put("/mi-perfil/actualizar", autenticar, actualizarMiPerfil);
router.put("/mi-perfil/password", autenticar, cambiarPassword);

module.exports = router;
