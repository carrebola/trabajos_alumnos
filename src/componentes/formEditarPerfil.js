import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
import { Archivo } from '../bd/archivo'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

export const formEditarPerfil = {
  template: `
    
<!-- Modal -->
<div class="modal fade" id="editar">
<div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Editar perfil</h5>
        <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        >
        <span aria-hidden="true"></span>
        </button>
    </div>
    <div class="modal-body">
        <form id="formEditarPerfil" class="p-3">
        <label class="mt-3 form-label" for="nick">Nombre: </label>
        <input id="edit_nombre" type="text" class="form-control" name="nombre" value="" />

        <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
        <input id="edit_apellidos" type="text" class="form-control" value="" name="apellidos"/>
        <label class="mt-3 form-label" for="inputAvatar">Imagen de perfil: </label>
        <input
            id="inputAvatar"
            type="file"
            class="form-control"
            value=""
        />
        </form>
        <div class="col-12 col-md-4 mt-5 ">
          <img src="https://images.hola.com/imagenes/estar-bien/20221018219233/buenas-personas-caracteristicas/1-153-242/getty-chica-feliz-t.jpg?tx=w_680" id="imagenAvatar" class="img img-fluid">
        </div>
    </div>
    <div class="modal-footer">
        <button id="guardarCambios" type="button" class="btn btn-primary"  data-bs-dismiss="modal">
        Guardar cambios
        </button>
        <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        >
        Cerrar
        </button>
    </div>
    </div>
</div>
</div>
  
  `,
  script: async () => {
    // Seleccionamos el input de avatar para detectar cuando cambia porque se ha seleccionado una imagen
    document.querySelector('#inputAvatar').addEventListener('change', function (e) {
      // Capturamos la imagen del input
      const file = e.target.files[0]
      // Cargamos la imagen en un div creando una url a partir del archivo
      document.querySelector('#imagenAvatar').src = window.URL.createObjectURL(file)
    })

    // Código de validación
    // Seleccionamos el formulario de editar usuario
    const formulario = document.querySelector('#formEditarPerfil')

    // Capturamos los datos del usuario logueado
    const usuarioLogueado = await User.getUser()

    // Si el usuario logeado existe
    if (usuarioLogueado) {
      const userId = usuarioLogueado.id
      // Capturamos los datos del perfil del usuario logueado
      const datosUsuario = await Perfil.getByUserId(userId)
      // Insertamos los datos en el formulario para editar el usuario
      formulario.nombre.value = datosUsuario.nombre
      formulario.apellidos.value = datosUsuario.apellidos
      // Cargamos la imagen actual del perfil
      document.querySelector('#imagenAvatar').src = datosUsuario.avatar

      // Capturamos una lista de las imagenes que ha subido el usuario
      const listaImagenes = await Archivo.getImagesByUser(userId, 'avatar')
      console.log(userId)
      console.log(listaImagenes)
    }

    // Evento de click en el botón guardar
    document.querySelector('#guardarCambios').addEventListener('click', async (e) => {
      try {
        // Si se ha seleccionado una imagen la subimos
        const file = document.querySelector('#inputAvatar').files[0]
        let url = ''
        // Capturamos los datos del usuario logueado
        const usuarioLogueado = await User.getUser()
        const datosUsuario = await Perfil.getByUserId(usuarioLogueado.id)
        if (file) {
          const data = await Archivo.uploadFile(usuarioLogueado.id, 'avatar', file)
          console.log(data)
          // Obtenemos la url
          url = await Archivo.getUrl('avatar', data)
          console.log('url de la imagen subida', url)
        }

        // Modificamos los campos del usuario
        if (url) datosUsuario.avatar = url.publicUrl
        datosUsuario.nombre = formulario.nombre.value
        datosUsuario.apellidos = formulario.apellidos.value
        // Guardamos los cambios en la bd
        await datosUsuario.update(datosUsuario)
        alert('Usuario actualizado')
      } catch (error) {
        alert('No se pudo guardar los cambios ' + error)
      }
    })
  }
}
