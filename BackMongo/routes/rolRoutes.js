const express = require("express");
const { crearRol, obtenerRoles, asignarPermisos, crearUsuario, obtenerUsuarios, eliminarUsuario,verreportes } = require("../controllers/rolController");
const { autenticar, verificarPermiso } = require("../Auth/authMiddleware");

const router = express.Router();

// Roles
router.post("/crear-rol", autenticar, verificarPermiso("asignar_roles"), crearRol); //Crear nuevos roles Supervisor, ETC.
router.get("/obtenerRoles", autenticar, verificarPermiso("ver_roles"), obtenerRoles); //Se pueden ver los roles.
router.put("/:id/permisos", autenticar, verificarPermiso("asignar_roles"), asignarPermisos); //Update a los roles.

router.post("/crear", autenticar, verificarPermiso("crear_usuario"), crearUsuario);  // Creacción de user.
router.get("/obtenerUsuarios", autenticar, verificarPermiso("ver_usuarios"), obtenerUsuarios); //Se listan todos los users.
router.delete("/:id", autenticar, verificarPermiso("eliminar_usuario"), eliminarUsuario);  //Eliminar un usuario.
router.get("/reportes", autenticar, verificarPermiso("ver_reportes"), verreportes);  //Repiortes


module.exports = router;



