const mongoose = require("mongoose");
const Rol = require("../models/rol");

const inicializarRoles = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/proyecto");

    const roles = [
      { nombre: "admin", permisos: ["crear_usuario", "eliminar_usuario", "asignar_roles", "ver_roles", "ver_usuarios"] },
      { nombre: "usuario", permisos: [] }
    ];

    for (const rol of roles) {
      const existe = await Rol.findOne({ nombre: rol.nombre });
      if (!existe) {
        await Rol.create(rol);
        console.log(`Rol ${rol.nombre} creado ✅`);
      }
    }

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

inicializarRoles();
