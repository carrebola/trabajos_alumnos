import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Proyecto, ProyectoDetalle } from '../../bd/proyecto'
import { Comentario } from '../../bd/comentario'
import { EnunciadoRubrica, EnunciadoRubricaDetalle } from '../../bd/enunciadoRubrica'

import { Nota } from '../../bd/nota'
import { estrellas } from '../../componentes/estrellas'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <h1 id="nombre_proyecto" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
        <img src="assets/imagenes/proyectos/proyecto.png" class="w-400" alt="imagen proyecto">
      </div>
    </div>
    <!-- DAtos proyecto -->
    <div class="col-12 col-md-4 mt-2">
      <h5> Información general: </h5>
      <p>Autor: <span id="autor_proyecto" class="text-center p-2"></span></p>
      <p>Enunciado: <span id="enunciado_proyecto" class="text-center p-2"></span></p>
      <p>Enlace: <a id="enlace_proyecto" class="text-center p-2" target="_black">Link a mi proyecto</a></p>
      <h5>Descripción:</h5>
      <p id="descripcion_proyecto"></p>
    </div>
    <!-- Valoracion   -->
    <div class="col-12 col-md-8">
      <div class="row">
        <div class="col-12 col-xl-6 mt-2">
          <h5>Valoración alumnos:</h5>
          <div id="valoracion">
            <!-- Aqui van los criterios y las estrellas -->
          </div>
          
        </div>
        <div class="col-12 col-xl-6 mt-2 ">
          <h5>Tu valoración:</h5>
          <div id="valoracionPersonal">
            <!-- Aqui van los criterios y las estrellas -->
            
          </div> 
        </div>
      </div>
    </div>
    <!-- Comentarios -->
    <div class="col-12">
      <h3>Comentarios:</h3>
      
      <form id="formComentario">
        <div class="comentario d-flex flex-wrap align-item-top bg-dark p-3 mb-5">
          
            <div class="w-100 d-flex">
              <img id="imgPerfilLogueado" src="/assets/avatar.svg" alt="us" class="border me-3 mt-1" style="width:50px;height:50px;">
              <textarea id="nuevoComentario" class="m-1 form-control h-75" placeholder="Escribe un comentario..." required></textarea>
            </div>
            
            <button id="btnEnviarComentario" type="submit" class="btn btn-success btn-small  ms-auto">Enviar comentario</button>
          
        </div>
      </form>
      

      <div id="comentarios">
        
    </div>
  </div>
</div>
    `,
  script: async (id) => {
    // Cargamos datos generales
    let usuarioLogueado = ''
    let perfilLogueado = ''
    let proyectoD = ''

    try {
      // capturamos datos del proyecto
      usuarioLogueado = await User.getUser()
      perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      proyectoD = await ProyectoDetalle.proyectoDetalleId(id)
      // insertamos los datos en la página
      document.querySelector('#imgPerfilLogueado').src = perfilLogueado.avatar
      const autor = proyectoD.nombre_usuario + ' ' + proyectoD.apellidos_usuario
      document.querySelector('#nombre_proyecto').innerHTML = proyectoD.id + ' - ' + proyectoD.nombre
      document.querySelector('#descripcion_proyecto').innerHTML = proyectoD.descripcion
      document.querySelector('#autor_proyecto').innerHTML = autor
      document.querySelector('#enunciado_proyecto').innerHTML = proyectoD.nombre_enunciado
      document.querySelector('#enlace_proyecto').innerHTML = proyectoD.enlace
      document.querySelector('#enlace_proyecto').setAttribute('href', proyectoD.enlace)
    } catch (error) {
      console.log(error)
      window.alert('Error al mostrar el proyecto' + error)
    }

    // Intentamos leer las notas de este proyecto
    let notas = []
    try {
      notas = await Nota.getAllByProjectId(proyectoD.id)
      // funcion que calcula la media para una rubrica en concreto
    } catch (error) {
      console.log('no hay notas para este proyecto', error)
    }
    // Intentamos pintar rubricas
    try {
      const rubricasDetalle = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(proyectoD.enunciado_id)
      // pintamos las rubricas y nota media
      const pintaRubricas = async (user_id = null) => {
        let HTMLlistaRubricas = '<ul class="list-group list-group-flush">'
        const calculaNota = (rubrica_id) => {
          let notasRubrica = []
          notasRubrica = notas.filter(ele => ele.rubrica_id === rubrica_id)
          let sumaNotas = 0
          notasRubrica.forEach(notas => {
            sumaNotas += notas.nota
          })
          const notaMedia = notasRubrica.length > 0 ? (sumaNotas / notasRubrica.length).toFixed(2) : ''
          return (notaMedia)
        }
        rubricasDetalle.forEach(element => {
          let info = ''
          info = (calculaNota(element.rubrica_id)) + ' ' + estrellas(Math.round(calculaNota(element.rubrica_id)))
          HTMLlistaRubricas += `
          <li class="list-group-item d-flex justify-content-between ">   
            ${element.rubrica_nombre} (${element.peso}/100) 
            <span class="d-flex">
            ${info} 
            </span>
          </li>`
        })
        HTMLlistaRubricas += '</ul>'
        return HTMLlistaRubricas
      }

      // pintamos las rubricas y nota que ha puesto el usuario
      const pintaRubricasUsuario = async (user_id = null) => {
        // Si recibe user_id pinta la nota que el usuario a puesto y las estrellas, sino, pinta la media de alumnos y las estrellas
        const rubricasDetalle = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(proyectoD.enunciado_id)
        console.log('rubricas detalle ', rubricasDetalle)

        let HTMLlistaRubricas = '<ul class="list-group list-group-flush">'
        rubricasDetalle.forEach(element => {
          let nota
          let id
          console.log('notas', notas)
          if (notas.length > 0) {
            const miNotaFiltrada = notas.filter(nota => nota.rubrica_id === element.rubrica_id && nota.user_id === proyectoD.user_id)
            if (miNotaFiltrada.length > 0) {
              nota = miNotaFiltrada[0].nota
              id = miNotaFiltrada[0].id
            }
          }
          const inputMiNota = `
            <input 
              id = "inputMiNota" 
              class = "nota" 
              type = "number" 
              min = "0" max = "5" 
              value = "${nota}"
              data-id = "${id}"
              data-userId = "${proyectoD.user_id}"
              data-rubricaId = "${element.rubrica_id}"
              data-proyectoId = "${proyectoD.id}" 
              data-nota = "${nota}"
            />`
          const info = inputMiNota + ' ' + estrellas(Math.round(nota))

          HTMLlistaRubricas += `
          <li class="list-group-item d-flex justify-content-between ">   
            ${element.rubrica_nombre} (${element.peso}/100) 
            <span class="d-flex">
            ${info} 
            </span>
          </li>`
        })
        HTMLlistaRubricas += '</ul>'
        return HTMLlistaRubricas
      }

      document.querySelector('#valoracion').innerHTML = await pintaRubricas()
      document.querySelector('#valoracionPersonal').innerHTML = await pintaRubricasUsuario(proyectoD.user_id)
    } catch (error) {
      console.log(error)
      window.alert('Error al mostrar las rubricas' + error)
    }

    // Intentamos PINTAR COMENTARIOS
    try {
      // Definición de función pintaTablaComentarios
      const pintaTablaComentarios = async () => {
        const comentarios = await Comentario.getAllByProjectId(id)
        let divComentarios = `
        <div id="divComentario" class="comentario d-flex flex-wrap align-item-top">`
        for (const comentario of comentarios) {
          // Capturamos autor del comentario
          const perfil = await Perfil.getByUserId(comentario.user_id)
          const autor = perfil.nombre + ' ' + perfil.apellidos
          const avatar = perfil.avatar
          const fecha = perfil.created_at.split('T')[0]
          divComentarios += `
          <div class="w-100 d-flex bg-dark mb-2 p-3">
          <img src="${avatar}" alt="us" class="border me-3 mt-1" style="width:50px;height:50px;">
            <div class="w-100">          
              <div class="comentario">${comentario.comentario}</div>

              <p class="text-end small "><em>${fecha} - ${autor}</em></p>
            </div>
          </div>
            `
        }
        divComentarios += '</div>'
        document.querySelector('#comentarios').innerHTML = divComentarios
      }
      pintaTablaComentarios()
      // Insertar comentario
      document.querySelector('#formComentario').addEventListener('submit', async (e) => {
        e.preventDefault()
        const inputComentario = document.querySelector('#nuevoComentario')
        const datosComentario = {
          comentario: inputComentario.value,
          user_id: usuarioLogueado.id,
          proyecto_id: id
        }
        await Comentario.create(datosComentario)
        inputComentario.value = ''
        inputComentario.focus()

        pintaTablaComentarios()
      })
    } catch (error) {
      console.log(error)
      alert('Error al mostrar las COMENTARIOS' + error)
    }

    // Evento cambio sobre inputMiNota
    document.addEventListener('change', async (e) => {
      console.log(e.target.dataset)
      if (e.target.classList.contains('nota')) {
        const datosNota = {
          nota: e.target.value,
          proyecto_id: e.target.dataset.proyectoid,
          user_id: e.target.dataset.userid,
          rubrica_id: e.target.dataset.rubricaid
        }

        try {
          // Si no tiene nota la insertamos. Si ya hay nota la actualizamos
          const notaData = e.target.dataset.nota
          console.log('nota usuario ', notaData)
          if (notaData === 'undefined') {
            await Nota.create(datosNota)
            e.target.setAttribute('data-nota', datosNota.nota)
          } else {
            const notaUsuario = new Nota(datosNota)
            notaUsuario.id = e.target.dataset.id
            const notaUsuarioActualizada = await notaUsuario.update()
          }
        } catch (error) {
          window.alert('Error al actualizar nota: ' + error)
        }

        // const notaCreada = await Nota.create(datosNota)
      }
    })
  }

}
