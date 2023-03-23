import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'

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
        </form>
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
    }

    // Evento de click en el botón guardar
    document.querySelector('#guardarCambios').addEventListener('click', async (e) => {
      try {
        // Capturamos los datos del usuario logueado
        const usuarioLogueado = await User.getUser()
        const datosUsuario = await Perfil.getByUserId(usuarioLogueado.id)
        // Modificamos los campos del usuario
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
