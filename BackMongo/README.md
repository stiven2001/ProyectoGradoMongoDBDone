# ProyectoGradoMongoDB

/backend    -> Proyecto Node.js/Express

cd ProyectoMongo\BackMongo

npm install

PORT=3000
MONGO_URI=<tu_uri_mongodb>

node app.js

El backend correrá en http://localhost:3000.

📂 Rutas de la API

| Método | Endpoint           | Descripción                                                                          |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| POST   | `/api/auth/signup` | Registrar un nuevo usuario. Recibe: `nombre`, `correo`, `contraseña`, `edad`, `rol`. |
| POST   | `/api/auth/login`  | Iniciar sesión. Recibe: `correo`, `contraseña`. Devuelve token JWT.                  |

🛡 Roles y permisos Admin.

| Método | Endpoint                  | Descripción               | Permiso requerido |
| ------ | ------------------------- | ------------------------- | ----------------- |
| POST   | `/api/roles/crear-rol`    | Crear un nuevo rol        | `asignar_roles`   |
| GET    | `/api/roles/obtenerRoles` | Obtener todos los roles   | `ver_roles`       |
| PUT    | `/api/roles/:id/permisos` | Asignar permisos a un rol | `asignar_roles`   |
| ------ | ---------------------------- | ------------------------- | ------------------ |
| POST   | `/api/roles/crear`           | Crear un nuevo usuario    | `crear_usuario`    |
| GET    | `/api/roles/obtenerUsuarios` | Listar todos los usuarios | `ver_usuarios`     |
| DELETE | `/api/roles/:id`             | Eliminar un usuario       | `eliminar_usuario` |

👤 Perfil personal (usuarios autenticados)

| Método | Endpoint                             | Descripción                       |
| ------ | ------------------------------------ | --------------------------------- |
| GET    | `/api/usuarios/mi-perfil`            | Ver los datos de tu perfil        |
| PUT    | `/api/usuarios/mi-perfil/actualizar` | Actualizar los datos de tu perfil |
| PUT    | `/api/usuarios/mi-perfil/password`   | Cambiar contraseña                |


Agrega el token JWT en los headers para los endpoints protegidos:
Authorization: Bearer <tu_token>


