import express from 'express'
import dotenv from "dotenv"
import conectarDB from './config/db.js'


// Import de RUTAS
import usuarioRoutes from './routes/usuarioRoutes.js'


const app = express();

app.use(express.json()); // Permite que nuestra app acepte jsons

dotenv.config();

conectarDB();

// Routing

app.use('/api/usuarios',usuarioRoutes)


const PORT = process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})