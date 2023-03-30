import { Perfil } from '../../bd/perfil'
import { Rubrica } from '../../bd/rubrica'
export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container">
      <h1>Rúbricas</h1>
      <a href="/#/nuevoRubrica" id="nuevoRubrica" class="btn btn-success mt-3">Nuevo Rubrica</a>
      <a href="/#/misRubricas" id="misRubricas" class="btn btn-warning mt-3 ms-2">Mis Rubricas</a>
      <table id="tablaRubricas" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ESTADO</th>
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
      const rubricas = await Rubrica.getAll()
      console.log('numero rubricas ', rubricas.length)
      // Generamos la tabla tablaRubricas
      let tabla = ''

      for (const rubrica of rubricas) {
        console.log('rubrica ', rubrica)
        // Capturamos el nombre del autor de cada rubrica
        const perfil = await Perfil.getByUserId(rubrica.user_id)
        const autor = perfil.nombre + ' ' + perfil.apellidos
        tabla += `
      <tr>
        
        <td>${autor}</td>
        <td>${rubrica.nombre}</td>
        <td class="w-100">${rubrica.descripcion}</td>
        <td class="w-100">${rubrica.activo}</td>
        <td class="text-end">
          <button
            data-id="${rubrica.id}"
            type="button"
            class="btn text-danger detalle"
          >
          <img  data-id="${rubrica.id}" class="detalle w-100" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
          </button>
          <button
            data-id="${rubrica.id}"
            type="button"
            class="btn text-info editar"
          >
            <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${rubrica.id}"/>
          </button>
        
          <button
              data-id="${rubrica.id}"
              type="button"
              class="btn text-danger bloquear"
          >
            <img  data-id="${rubrica.id}" class="bloquear w-100" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
          </button>
        
          <button
              data-id="${rubrica.id}"
              type="button"
              class="btn text-danger borrar"
          >
            <img  data-id="${rubrica.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
          </button>
        </td>
      </tr>
      `
      }
      document.querySelector('#tablaRubricas tbody').innerHTML = tabla
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }

    // Borrar y Editar usuario
    document.querySelector('#tablaRubricas').addEventListener('click', async (e) => {
      // capturamos el id del usuarios
      const id = e.target.dataset.id
      //BLOQUEAR PROYECTO
      if (e.target.classList.contains('bloquear')) {
        try {
          const rubricaABloquear = await Rubrica.getById(id)
          if (rubricaABloquear.activo) {
            rubricaABloquear.activo = false
            e.target.classList.remove('bloqueado')
          } else {
            rubricaABloquear.activo = true
            e.target.classList.add('bloqueado')
          }

          await rubricaABloquear.block()
          window.location.href = '/#/rubricas'
        } catch (error) {
          alert('No se han podido desactivar el rubrica' + error)
        }
      }

      // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
      if (e.target.classList.contains('borrar')) {
        try {
          const rubricaABorrar = await Rubrica.getById(id)

          const seguro = confirm('¿Está seguro que desea borrar el rubrica? Se eliminarán todos sus comentarios y notas ' + rubricaABorrar.nombre + ', ' + rubricaABorrar.nombre)

          if (seguro) {
            await Rubrica.delete(id)
          }
          window.location.href = '/#/rubricas'
        } catch (error) {
          alert('No se han podido borrar el rubrica' + error)
        }
      }
      // EDITAR PROYECTO  USUARIO
      if (e.target.classList.contains('editar')) {
        window.location.href = '/#/editarRubrica/' + id
      }

      // VER DETALLE PROYECTO  USUARIO
      if (e.target.classList.contains('detalle')) {
        window.location.href = '/#/detalleRubrica/' + id
      }
    })
  }
}