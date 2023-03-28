import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'
import { Comentario } from '../../bd/comentario'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <h1 id="nombre_proyecto" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
        <img src="assets/imagenes/proyectos/proyecto.png" class="w-400" alt="imagen proyecto">
      </div>
      <p>Autor: <span id="autor_proyecto" class="text-center p-2"></span></p>
      <p>Enlace: <a id="enlace_proyecto" class="text-center p-2" target="_black">Link a mi proyecto</a></p>
      <h3>Descripción:</h3>
      <p id="descripcion_proyecto"></p>
      <hr class="mt-5">
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

      const proyecto = await Proyecto.getById(id)
      const perfilAutor = await Perfil.getByUserId(proyecto.user_id)
      const autor = perfilAutor.nombre + ' ' + perfilAutor.apellidos
      document.querySelector('#nombre_proyecto').innerHTML = proyecto.nombre
      document.querySelector('#descripcion_proyecto').innerHTML = proyecto.descripcion
      document.querySelector('#autor_proyecto').innerHTML = autor

      document.querySelector('#enlace_proyecto').innerHTML = proyecto.enlace
      document.querySelector('#enlace_proyecto').setAttribute('href', proyecto.enlace)
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
