import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

// MIDLEWARE NÚMERO 1-----------------------------------

// Esto se ejecuta antes de almacenar el registro en la base de datos
usuarioSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        // Esto de next hace que se ejecute el siguiente middleware y este ya no
        next();
    }

    // Por esto hago que la funcion sea asincronica, tengo que esperar a que se cargue la salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
}
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario