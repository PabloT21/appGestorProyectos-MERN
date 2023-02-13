import express from "express";

import { registrar } from '../controllers/usuarioController.js'


const router = express.Router()

// Creación, registro y confirmación de usuarios

router.post('/', registrar); // Crea un nuevo usuario


export default router;