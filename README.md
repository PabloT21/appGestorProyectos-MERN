# Gestor de Proyectos (Stack MERN)

## Tecologías utilizadas

* React
* Mongo DB + Mongoose
* Express
* Node
* Tailwind CSS
* Socket IO para actualización en tiempo real


## Descripción de los modelos

### Usuario:

Modelo para representar a todos los usuarios registrados en la aplicación
Tiene los siguientes campos:

* Nombre 
* Password 
* Email (Debe ser único)
* Token (Sirve para enviarlo en el mail de confirmación de cuenta)
* Confirmado (Boolean) Sirve para saber si el usuario confirmo el mail o no