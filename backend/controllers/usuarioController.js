import Usuario from "../models/Usuario.js"


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
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    }
    catch(error){
        console.log(error)
    }
}


export { registrar }