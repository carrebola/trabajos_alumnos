//Ejemplo para crud
import { Perfil } from "./perfil"

// Con estos métodos, podrás realizar operaciones CRUD completas en la tabla `perfiles` utilizando la clase `Perfil`. Por ejemplo, para crear un nuevo perfil:

//Ver todos los perfiles
try {
    const perfiles  = await Perfil.getAll()
    console.log(perfiles);
} catch (error) {
    throw new Error(error)
    console.log('No puedo mostrar todos ', error)
}
console.log()

//creamos el perfil
try {
    const nuevoPerfil = {
        nombre: 'Alberto',
        apellidos: 'Perico'
    }
    //await Perfil.create(nuevoPerfil)  
} catch (error) {
    console.log('uf! error al crear: ' + error);
}



//Acutualizar perfil
try {
    const perfilExistente = await Perfil.getById(180)
    console.log(perfilExistente)
    perfilExistente.nombre = 'Pedro'
    perfilExistente.apellidos = 'Gómez'
    await perfilExistente.update()
} catch (error) {
    console.log('uf! error al actualizar: ' + error);
}


// Eliminar perfil
try {
    // const perfilAEliminar = await Perfil.getById(108)
    // await perfilAEliminar.delete()
} catch (error) {
    console.log('uf! error al eliminar ',error);
}

