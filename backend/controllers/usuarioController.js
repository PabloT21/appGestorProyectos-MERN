import Usuario from "../models/Usuario.js"

// Import de Helpers
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


// FUNCION PARA REGISTRAR USUARIO ---------------------------

// Uso async porque tengo que guardar datos en la BD, y puede tardar
const registrar = async (req,res) => {

    // Evitar registros duplicados
    const {emailUser} = req.body;
    const existeUsuario = await Usuario.findOne({ email: emailUser})

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message})
    }

    try{
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    }
    catch(error){
        console.log(error)
    }
}

// Función para autenticar usuarios----------------------
const autenticar = async (req,res) => {

    const {email, password} = req.body;

    // Comprobar que el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message})
    }


    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(404).json({ msg: error.message})
    }

    if (await usuario.comprobarPassword(password)){
        res.json({
            // Asi maneja mongo db los ids
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._ID),
        })
    }
    else{
        const error = new Error('La contraseña es incorrecta')
        return res.status(404).json({ msg: error.message})    }


    // Comprobar si la password es correcta
}



export { registrar, autenticar, confirmar }