import { Perfil } from '../bd/perfil'
export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container mt-5">
      <h1>Administración de usuarios</h1>
      <table id="tablaPerfiles" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>NOMBRE</th>
                  <th>APELLIDOS</th>
                  <th>EMAIL</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
                     
              <tr>
                  <td>
                      <img src="/assets/avatar.svg" width="50" alt="" />
                  </td>
                  <td>Charly</td>
                    <td>Bazoca Rota</td>
                    <td>carly@gmail.com</td>
                  <td class="text-end">
                      <button
                          id="btn_editar"
                          type="button"
                          class="btn text-info"
                          data-bs-toggle="modal"
                          data-bs-target="#editar"
                      >
                        <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" />
                      </button>
                      <button
                          type="button"
                          class="btn text-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#borrar"
                      >
                        <img src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
                      </button>
                  </td>
              </tr>
              
          </tbody>
      </table>
  </div>
</main>

`,

  script: async () => {
    // Generación de tabla
    try {
      // Capturamos todos los usuarios de la tabla perfiles
      const perfiles = await Perfil.getAll()
      // Generamos la tabla tablaPerfiles
      let tablaPerfiles = ''
      perfiles.forEach((perfil) => {
        tablaPerfiles += `
          <tr>
            <td>
                <img src="/assets/avatar.svg" width="50" alt="" />
            </td>
            <td>${perfil.nombre}</td>
            <td>${perfil.apellidos}</td>
            <td>${perfil.email}</td>
            <td class="text-end">
              <button
                data-id="${perfil.data_id}"
                id="btn_editar"
                type="button"
                class="btn text-info"
                data-bs-toggle="modal"
                data-bs-target="#editar"
              >
                <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" />
              </button>
              <button
                  data-id="${perfil.id}"
                  type="button"
                  class="btn text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#borrar"
              >
                <img src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
              </button>
            </td>
          </tr>
        `
      })
      document.querySelector('#tablaPerfiles tbody').innerHTML = tablaPerfiles
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }

    // Edición de perfil de usuario
    // Script para la validación del formulario
    const form = document.querySelector('#form_editar')
    const btnEditar = document.querySelector('#btn_editar')
    btnEditar.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      form.classList.add('was-validated')
      console.log(form.checkValidity())
      if (!form.checkValidity()) {
        console.log('formulario no valido')
      } else {
        console.log('formulario valido, debe hacerse el submit')
      }
    })
  }
}
