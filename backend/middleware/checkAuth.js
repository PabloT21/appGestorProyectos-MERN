import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

const checkAuth = async (req,res,next) =>{
    let token;
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            // Con esto ya me quede con el JWT sin la parte de Bearer
            
            // Decodifico el JWT para ver la información del usuario
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Esto se hace para guardar información del usuario en la sesión. COn el - password le digo que no guarde el password
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
            
            return next();

        } catch (error){
            return res.status(404).json({msg: "Hubo un error con el token"})
        }
    }
    if (!token){
        const error = new Error('Token no válido')
        res.status(401).json({msg: error.message})
    }
}

export default checkAuth