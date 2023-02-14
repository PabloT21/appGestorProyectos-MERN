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

    // Comprobar si la contraseña es correcta
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
        return res.status(404).json({ msg: error.message})    
    }
}

// Función para que un usuario pueda confirmar su cuenta--------------------------------------

const confirmar = async (req,res) => {
    
    // EN req.params estan los parametros que envie en la URL
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    if (!usuarioConfirmar){
        const error = new Error('Token de confirmación invalido')
        return res.status(404).json({ msg: error.message})    
    }
    try{
        // Confirmo la cuenta en la BD
        usuarioConfirmar.confirmado = true

        // Borro el token de confirmación, es de 1 solo uso
        usuarioConfirmar.token = ""
        
        await usuarioConfirmar.save()
        res.json({msg: "Usuario confirmado correctamente"})
    }
    catch(error){
        console.log(error)
    }

}

// Función para RESETEAR contraseña -----------------------

const resetPassword = async (req,res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message})
    }

    // Si el usuario existe, genero un token y lo guardo, para enviarlo en el mail
    usuario.token = generarId();
    await usuario.save()
    res.json({ msg: "Hemos enviado un email con las instrucciónes" })

}

// Función para comprobar un token de reseteo de contraseña

const comprobarToken = async (req,res) => {
    const { token } = req.params;

    const tokenValido= await Usuario.findOne({ token: token });

    if (tokenValido){
        res.json({ msg: "Token válido y el Usuario existe"})
    }
    else{
        const error = new Error('Token no válido')
        return res.status(404).json({ msg: error.message})
    }
}

// Función para cambiar la contraseña de un usuario

const nuevoPassword = async (req,res) => {
    const { token } = req.params
    const { password } = req.body

    // Compruebo si el token es valido
    const usuario = await Usuario.findOne({ token: token });

    if (usuario){
        usuario.password = password
        usuario.token = ""
        try{
            await usuario.save()
            res.json({ msg: "Contraseña modificada correctamente"})
        }
        catch (error){
            console.log(error)
        }
    }
    else{
        const error = new Error('Token no válido')
        return res.status(404).json({ msg: error.message})
    }
}




export { registrar, autenticar, confirmar, resetPassword, comprobarToken, nuevoPassword}