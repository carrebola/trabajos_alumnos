import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Proyecto, ProyectoDetalle } from '../../bd/proyecto'
import { Comentario } from '../../bd/comentario'
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
    <div class="col-12 col-md-6">
      <p>Autor: <span id="autor_proyecto" class="text-center p-2"></span></p>
      <p>Enunciado: <span id="enunciado_proyecto" class="text-center p-2"></span></p>
      <p>Enlace: <a id="enlace_proyecto" class="text-center p-2" target="_black">Link a mi proyecto</a></p>
      <h5>Descripción:</h5>
      <p id="descripcion_proyecto"></p>
      <hr class="mt-5">
    </div>
    <!-- Valoracion   -->
    <div class="col-12 col-md-3  border p-2">
      <h5>Valoración alumnos:</h5>
      <div id="valoracion">
        <!-- Aqui van los criterios y las estrellas -->
      </div>
      ${estrellas(2)}
    </div>
    <div class="col-12 col-md-3 border  p-2">
      <h5>Tu valoración:</h5>
      <div id="valoracionPersonal">
        <!-- Aqui van los criterios y las estrellas -->
        ${estrellas(4)}
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
    console.log('pagina cargada')
    try {
      const usuarioLogueado = await User.getUser()
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)

      document.querySelector('#imgPerfilLogueado').src = perfilLogueado.avatar

      const proyectoD = await ProyectoDetalle.getById(id)
      const notas = await Nota.getAllByProjectId(proyectoD.id)
      console.log('notas ' ,notas)
      
      // const autor = perfilAutor.nombre + ' ' + perfilAutor.apellidos
      const autor = proyectoD.nombre_usuario + ' ' + proyectoD.apellidos_usuario
      document.querySelector('#nombre_proyecto').innerHTML = proyectoD.nombre
      document.querySelector('#descripcion_proyecto').innerHTML = proyectoD.descripcion
      document.querySelector('#autor_proyecto').innerHTML = autor
      document.querySelector('#enunciado_proyecto').innerHTML = proyectoD.nombre_enunciado

      document.querySelector('#enlace_proyecto').innerHTML = proyectoD.enlace
      document.querySelector('#enlace_proyecto').setAttribute('href', proyectoD.enlace)
      // pintamos los criterios
      document.querySelector('#valoracion').innerHTML = 'RUBRICAS'


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
      alert('Error al mostrar el proyecto' + error)
    }
  }

}
