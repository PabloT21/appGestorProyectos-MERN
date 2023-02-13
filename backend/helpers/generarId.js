
// Esta función genera el token que posteriormente 
// nos va a servir para confirmar la cuenta mediante email

const generarId = () =>{
    const random = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)
    return random+fecha
}

export default generarId
