import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'
import { Enunciado } from '../../bd/enunciado'
import { fechasTareas } from '../../componentes/fechasTareas'
import { Semana } from '../../bd/semanas'

import Swal from 'sweetalert2'

export default {
  template: `
  
    <h1 class="text-center pt-1">Tareas entregadas</h1>
    <div id="marcador" class="position-absolute border-end border-success border-5 h-100 ms-1" style="width: 1200px; background-color: rgb(200,200,200,0.1); z-index: -1"></div>
    <div class="" style="width: 4000px; box-sizing: border-box; position: relative">
      ${fechasTareas.template}
    </div>
    <div id="tareas">
      ...
    </div>

    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

    <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Tarea</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h1 id="nombreTarea"></h1>
        <div id="idTarea">...</div>
      </div>
    </div>


`,
  script: async () => {
    // Generación de tabla
    const pintaDivsTareas = async () => {
      try {
        const tareas = await Enunciado.getAll()
        const semanas = await Semana.getAll()
        fechasTareas.script(semanas)
        // Capturamos las tareas
        let divTareas = ''

        tareas.forEach((element, index) => {
          // calculamos la posición de la tarea para apliar el margen a la izquierda y situarla
          const posicionInicial = semanas.findIndex(semana => element.fecha_inicio <= semana.fecha)
          const posicionFinal = semanas.findIndex(semana => element.fecha_final <= semana.fecha)
          const longitudTarea = posicionFinal - posicionInicial
          divTareas += `
          <div 
            class="tarea border shadow d-flex align-items-center p-2 small" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasRight" 
            aria-controls="offcanvasRight" 
            style="width: ${longitudTarea * 100}px; height: 60px; margin-left: ${100 * posicionInicial}px;" title="${element.fecha_inicio} - ${element.fecha_final}" data-id="${element.id}">
            ${element.nombre}
          </div>
          `
        })
        document.querySelector('#tareas').innerHTML = divTareas

        document.querySelector('main').addEventListener('click', (e) => {
          if (e.target.classList.contains('tarea')) {
            const idTarea = e.target.dataset.id
            console.log('id tarea', idTarea)
            document.querySelector('#nombreTarea').innerHTML = idTarea
            document.querySelector('#idTarea').innerHTML = idTarea
          }
        })
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
