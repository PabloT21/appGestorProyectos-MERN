import Usuario from "../models/Usuario.js"


// Uso async porque tengo que guardar datos en la BD, y puede tardar
const registrar = async (req,res) => {
    
    // Evitar registros duplicados


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