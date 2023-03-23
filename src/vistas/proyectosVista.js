import { Perfil } from '../bd/perfil'
import { Proyecto } from '../bd/proyecto'
import { formEditarUsuario } from '../componentes/formEditarUsuario'
export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container mt-5">
      <h1>Proyectos</h1>
      <table id="tablaPerfiles" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>NOTA</th>
                  <th class="w-100"></th>
              </tr>
          </thead>
          <tbody>
                     
              
              
          </tbody>
      </table>
  </div>
</main>

`,

  script: async () => {
    // Generación de tabla
    try {
      // Capturamos todos los usuarios de la tabla perfiles
      const proyectos = await Proyecto.getAll()
      // Generamos la tabla tablaPerfiles
      let tabla = ''
      proyectos.forEach((proyecto) => {
        tabla += `
          <tr>
            <td>
                <img src="/assets/imagenes/proyectos/proyecto.png" width="100" alt="" />
            </td>
            <td>${proyecto.user_id}</td>
            <td>${proyecto.nombre}</td>
            <td class="w-100">${proyecto.descripcion}</td>
            <td>${proyecto.nota}</td>
            <td class="text-end">
              <button
                data-id="${proyecto.id}"
                type="button"
                class="btn text-info editar"
                data-bs-toggle="modal"
                data-bs-target="#editarUsuario"
              >
                <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${proyecto.id}"/>
              </button>
            
              <button
                  data-id="${proyecto.id}"
                  type="button"
                  class="btn text-danger bloquear"
              >
                <img  data-id="${proyecto.id}" class="bloquear w-100" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
              </button>
            
              <button
                  data-id="${proyecto.id}"
                  type="button"
                  class="btn text-danger borrar"
              >
                <img  data-id="${proyecto.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
              </button>
            </td>
          </tr>
        `
      })
      document.querySelector('#tablaPerfiles tbody').innerHTML = tabla
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }

    // Borrar y Editar usuario
    document.querySelector('#tablaPerfiles').addEventListener('click', async (e) => {
      // capturamos el id del usuarios
      const id = e.target.dataset.id
      // si es un boton de bloquear
      if (e.target.classList.contains('bloquear')) {
        try {
          const usuarioABloquear = await Perfil.getById(id)
          if (usuarioABloquear.bloqueado) {
            usuarioABloquear.bloqueado = false
            e.target.classList.remove('bloqueado')
            alert('Usuario desbloqueado')
          } else {
            usuarioABloquear.bloqueado = true
            e.target.classList.add('bloqueado')
            console.log(e.target.classList)
            alert('Usuario bloqueado')
          }

          await usuarioABloquear.block()
          window.location.href = '/#/adminUsuarios'
        } catch (error) {
          alert('No se han podido bloquear el usuario' + error)
        }
      }

      // BORRAR PERFIL USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
      if (e.target.classList.contains('borrar')) {
        try {
          const usuarioABorrar = await Perfil.getById(id)

          const seguro = confirm('¿Está seguro que desea borrar el usuario? ' + usuarioABorrar.apellidos + ', ' + usuarioABorrar.nombre)

          if (seguro) {
            await Perfil.delete(id)
          }
          window.location.href = '/#/adminUsuarios'
        } catch (error) {
          alert('No se han podido borrar el usuario' + error)
        }
      }
      // editar PERFIL USUARIO
      if (e.target.classList.contains('editar')) {
        formEditarUsuario.script(id)
      }
    })

    // // Edición de perfil de usuario
    // // Script para la validación del formulario
    // const form = document.querySelector('#form_editar')
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
