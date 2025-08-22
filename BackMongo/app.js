const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config();
const app = express()
const port = 3000

//Middlewares.
app.use(cors());
app.use(express.json());

//Imports Rutas.
const usuarioRoutes = require("./routes/usuarioRoutes");
const rolRoutes = require("./routes/rolRoutes");
const authRouter = require("./routes/authRoutes")

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/auth", authRouter)



//Conexión a MongoDB.
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Conexión a la Bd de Mongo exitosa.");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Funcionando por el port: " + (process.env.PORT || 3000));
    }) 
}).catch((err) => console.log("Error al conectar al mongo: ", err));
