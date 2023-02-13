import express from "express";

import { registrar, autenticar, confirmar } from '../controllers/usuarioController.js'


const router = express.Router()

// Creación, registro y confirmación de usuarios

router.post('/', registrar); // Crea un nuevo usuario

router.post('/login', autenticar); // Crea un nuevo usuario

router.get('confirmar/:token', confirmar)

export default router;