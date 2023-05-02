import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'
import { Enunciado } from '../../bd/enunciado'
import { tablaTareas } from '../../componentes/tablaTareas'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 50px">
    <div class="pt-5" style="width: 4000px; box-sizing: border-box;">
      ${tablaTareas.template}
    </div>
    <div id="tareas">
      ...
    </div>



  <div class="container-fluid">  
      <div class="d-flex justify-content-between border-bottom">
        <h1>Tareas entregadas</h1>
        
        <div>
          <a href="/#/misProyectos" id="misProyectos" class="btn btn-link mt-3 ms-2">Ver mis tareas entregadas</a>
          
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
    tablaTareas.script()
    // Generación de tabla
    const pintaDivsTareas = async () => {
      try {
      // Capturamos las tareas
        let divTareas = ''
        const tareas = await Enunciado.getAll()
        console.log('tareas', tareas)
        tareas.forEach((element, index) => {
          divTareas += `
          <div class="tarea p-1 bg-primary text-white" style="width: 100px; margin-left: ${100*index}px;">
            ${element.nombre}
          </div>
          `
        })
        document.querySelector('#tareas').innerHTML = divTareas
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se han podido cargar la tabla de usuarios ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

    pintaDivsTareas() // Borrar y Editar usuario
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
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'No se han podido desactivar el proyecto' + error,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }

        // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
        if (e.target.classList.contains('borrar')) {
          try {
            const proyectoABorrar = await Proyecto.getById(id)

            // const seguro = confirm('¿Está seguro que desea borrar el proyecto? Se eliminarán todos sus comentarios y notas ' + proyectoABorrar.nombre + ', ' + proyectoABorrar.nombre)
            Swal.fire({
              title: '¿Estás seguro?',
              text: `Se borrará el proyecto: ${proyectoABorrar.nombre} y todos las notas y comentarios asociados a este proyecto!`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '¡Sí, borralo!'
            }).then(async (result) => {
              if (result.isConfirmed) {
                await Proyecto.delete(id)
                pintaTablaProyectos()
                Swal.fire(
                  'Borrado!',
                  'El archivo ha sido borrado.',
                  'success'
                )
              }
            })
          } catch (error) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'No se han podido borrar el proyecto' + error,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
        // EDITAR PROYECTO  USUARIO
        if (e.target.classList.contains('editar')) {
          window.location.href = '/#/editarProyecto/' + id
        }

        // VER DETALLE PROYECTO  USUARIO
        // Si ha hecho click sobre la imagen o sobre algún td de la fila
        if (e.target.classList.contains('detalle') || e.target.parentNode.classList.contains('detalle')) {
          console.log('detalle', e.target)
          // Si id es undefined porque ha hecho click en cualquier td del tr le asignamos el id del tr
          const nuevoid = id || e.target.parentNode.dataset.id
          window.location.href = '/#/detalleProyecto/' + nuevoid
        }
      })
    }
  }
}
