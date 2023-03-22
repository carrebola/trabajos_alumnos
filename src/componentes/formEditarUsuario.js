export const formEditarUsuario = {
  template: `
    
<!-- Modal -->
<div class="modal fade" id="editar">
<div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Editar usuario</h5>
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
        <form class="p-3">
        <label class="mt-3 form-label" for="nick">Nombre: </label>
        <input id="edit_nombre" type="text" class="form-control" value="" />

        <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
        <input id="edit_apellidos" type="text" class="form-control" value="" />

        <label class="mt-3 form-label" for="email">Email</label>
        <input
            id="edit_email"
            type="email"
            class="form-control"
            value="email@gmail.com"
        />

        <label class="mt-3 form-label" for="contraseña">Contraseña: </label>
        <input id="edit_contraseña" type="password" class="form-control" value="123456" />
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary">
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
  script: () => {
    // Código de validación
  }
}
