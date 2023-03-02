//Ejemplo para crud

// Con estos métodos, podrás realizar operaciones CRUD completas en la tabla `perfiles` utilizando la clase `Perfil`. Por ejemplo, para crear un nuevo perfil:


const nuevoPerfil = new Perfil(null, 'Juan', 'Pérez', 'user-123', 'activo', 'admin', 'https://url-del-avatar.jpg')

await nuevoPerfil.create()

const nuevoPerfil2 = new Perfil(null, 'Antonio', 'Pérez', 'user-123', 'activo', 'admin', 'https://url-del-avatar.jpg')

await nuevoPerfil.create()

//Acutualizar perfil
// const perfilExistente = await Perfil.getById(19)

// perfilExistente.nombre = 'Pedro'
// perfilExistente.apellidos = 'Gómez'

// await perfilExistente.update()

// //Eliminar perfil
// const perfilAEliminar = await Perfil.getById(20)

// await perfilAEliminar.delete()