import mongoose from "mongoose";

const conectarDB = async () =>{
    // En caso de que la conexión salga bien
    try {
        const connection = await mongoose.connect(
            // Uso las variables de entorno de dotenv
            process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const url = `${connection.connection.host}:${connection.connection.port}: `
        console.log(`MongoDB Conectado: ${url}` )
    }

    // Si hay un error lo recojo y lo imprimo
    catch(error){
        console.log(`error: ${errror.message}`);

        // Si no se pudo conectar a la BD, termino la aplicación
       // process.exit(1)
    }

};

export default conectarDB;