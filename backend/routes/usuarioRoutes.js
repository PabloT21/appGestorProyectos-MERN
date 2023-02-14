import express from "express";

import { registrar, 
        autenticar, 
        confirmar, 
        resetPassword, 
        comprobarToken, 
        nuevoPassword,
        perfil
} from '../controllers/usuarioController.js'

import checkAuth from "../middleware/checkAuth.js";



const router = express.Router()

// Creación, registro y confirmación de usuarios

router.post('/', registrar); // Crea un nuevo usuario

router.post('/login', autenticar); // Se fija si el usuario y pass son correctas, si esta confirmado, y crea un JWT

router.get("/confirmar/:token", confirmar) // Confirma una cuenta en base a el token enviado por parametro

router.post("/reset-password", resetPassword) // Envia un mail para recuperar la contraseña

router.route("/reset-password/:token")
        .get(comprobarToken) // Sirve para validar un token de recuperación de contraseña
        .post(nuevoPassword) // Resetea la contraseña del usuario

router.get('/perfil', checkAuth, perfil)

export default router;