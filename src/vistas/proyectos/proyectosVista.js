import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'

export default {
  template: `
  <main style="padding-top: 50px">
  <div class="container-fluid">  
      <div class="d-flex justify-content-between border-bottom">
        <h1>Proyectos</h1>
        <div>
          <a href="/#/misProyectos" id="misProyectos" class="btn btn-link mt-3 ms-2">Ver mis proyectos</a>
          <a href="/#/nuevoProyecto" id="nuevoProyecto" class="btn btn-success m-3 ms-auto">Nuevo Proyecto</a>
        </div>  
      </div>
      
      
      <table id="tablaProyectos" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th>IMAGEN</th>
                  <th>ID</th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ENLACE</th>
                  <th>NOTA</th>
                  <th>ACTIVO</th>
                  <th>ENUNCIADO</th>
                  <th class=""></th>
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
      console.log('numero proyectos ', proyectos.length)
      // Generamos la tabla tablaProyectos
      let tabla = ''

      for (const proyecto of proyectos) {
        // Si proyecto.nota es null no pintamos nada
        if (!proyecto.nota) proyecto.nota = '-'

        // Capturamos el nombre del autor de cada proyecto
        const perfil = await Perfil.getByUserId(proyecto.user_id)
        const autor = perfil.nombre + ' ' + perfil.apellidos
        tabla += `
      <tr>
        <td>
          <img src="/assets/imagenes/proyectos/proyecto.png" width="50" alt="" data-id="${proyecto.id}" class="detalle"/>
        </td>
        <td>${proyecto.id}</td>
        <td>${autor}</td>
        <td>${proyecto.nombre}</td>
        <td class="">${proyecto.descripcion}</td>
        <td><a href="${proyecto.enlace}" target="_black">${proyecto.enlace}</a></td>
        <td class="text-center">${proyecto.nota}</td>
        <td class="text-center">${proyecto.activo}</td>
        <td class="text-center">${proyecto.enunciado_id}</td>
        <td class="text-end">
          <div style="width: 150px">
            <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-danger detalle p-0"
            >
              <img  data-id="${proyecto.id}" class="detalle" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
            </button>
            <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-info editar p-0"
            >
              <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${proyecto.id}"/>
            </button>
          
            <button
                data-id="${proyecto.id}"
                type="button"
                class="btn text-danger bloquear p-0"
            >
              <img  data-id="${proyecto.id}" class="bloquear" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
            </button>
          
            <button
                data-id="${proyecto.id}"
                type="button"
                class="btn text-danger borrar p-0"
            >
              <img  data-id="${proyecto.id}" class="borrar" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
            </button>
          </div>
          
        </td>
      </tr>
      `
      }
      const tablaProyectosBody = document.querySelector('#tablaProyectos tbody')
      if (tablaProyectosBody) tablaProyectosBody.innerHTML = tabla
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }

    // Borrar y Editar usuario
    const tablaProyectos = document.querySelector('#tablaProyectos')
    if (tablaProyectos) {
      tablaProyectos.addEventListener('click', async (e) => {
      // capturamos el id del usuarios
        const id = e.target.dataset.id
        // BLOQUEAR PROYECTO
        if (e.target.classList.contains('bloquear')) {
          try {
            const proyectoABloquear = await Proyecto.getById(id)
            if (proyectoABloquear.activo) {
              proyectoABloquear.activo = false
              e.target.classList.remove('bloqueado')
            } else {
              proyectoABloquear.activo = true
              e.target.classList.add('bloqueado')
            }

            await proyectoABloquear.block()
            window.location.href = '/#/proyectos'
          } catch (error) {
            alert('No se han podido desactivar el proyecto' + error)
          }
        }

        // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
        if (e.target.classList.contains('borrar')) {
          try {
            const proyectoABorrar = await Proyecto.getById(id)

            const seguro = confirm('¿Está seguro que desea borrar el proyecto? Se eliminarán todos sus comentarios y notas ' + proyectoABorrar.nombre + ', ' + proyectoABorrar.nombre)

            if (seguro) {
              await Proyecto.delete(id)
            }
            window.location.href = '/#/proyectos'
          } catch (error) {
            alert('No se han podido borrar el proyecto' + error)
          }
        }
        // EDITAR PROYECTO  USUARIO
        if (e.target.classList.contains('editar')) {
          window.location.href = '/#/editarProyecto/' + id
        }

        // VER DETALLE PROYECTO  USUARIO
        if (e.target.classList.contains('detalle')) {
          window.location.href = '/#/detalleProyecto/' + id
        }
      })
    }
  }
}
