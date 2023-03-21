export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container mt-5">
      <h1>Administración de usuarios</h1>
      <table class="table table-striped table-hover mt-5 align-middle">
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
                      <img src="../public/images/avatar1.svg" width="50" alt="" />
                  </td>
                  <td>Charly</td>
                    <td>Bazoca Rota</td>
                    <td>carly@gmail.com</td>
                  <td class="text-end">
                      <button
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
              <tr>
                <td>
                    <img src="../public/images/avatar1.svg" width="50" alt="" />
                </td>
                <td>Charly</td>
                <td>Bazoca Rota</td>
                <td>carly@gmail.com</td>
                <td class="text-end">
                    <button
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
            <tr>
                <td>
                    <img src="../public/images/avatar1.svg" width="50" alt="" />
                </td>
                <td>Charly</td>
                <td>Bazoca Rota</td>
                <td>carly@gmail.com</td>
                <td class="text-end">
                    <button
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

  script: () => {
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
