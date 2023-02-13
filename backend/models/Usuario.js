import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({

    // Dato: Trim borra los espacios al inicio o final
    nombre: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    
    token: {
        type: String,
    },

    confirmado: {
        type: Boolean,
        default: false
    }

},
{
    // Esto crea 2 columnas mas , fecha creado y fecha actualizado
    timestamps: true
}
);

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario