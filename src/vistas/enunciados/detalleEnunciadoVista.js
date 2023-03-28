import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Enunciado } from '../../bd/enunciado'
import { Comentario } from '../../bd/comentario'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <h1 id="nombre_enunciado" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
        <img src="assets/imagenes/enunciados/enunciado.png" class="w-400" alt="">
      </div>
      <p>Autor: <span id="autor_enunciado" class="text-center p-2"></span></p>

      <span>Enlace: <span id="enlace_enunciado" class="text-center p-2"></span></span>
      <span>Última actualización: <span id="actualizado_enunciado" class="text-center p-2"></span></span>
      <div class="mt-3">
        <div class="btn btn-dark ">Módulo: <span id="modulo_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-dark">RA: <span id="ra_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-dark">UF: <span id="uf_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-dark">Fecha inicio: <span id="fechaInicio_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-dark">Fecha Final: <span id="fechaFinal_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-dark">Estado: <span id="estado_enunciado" class="text-center p-2"></span></div>
      </div>




      <h3 class="mt-4">Enunciado:</h3>
      <div class="bg-dark p-2 mt-2" id="definicion_enunciado"></div>
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

      const enunciado = await Enunciado.getById(id)
      const perfilAutor = await Perfil.getByUserId(enunciado.user_id)
      const autor = perfilAutor.nombre + ' ' + perfilAutor.apellidos
      document.querySelector('#nombre_enunciado').innerHTML = enunciado.nombre
      document.querySelector('#definicion_enunciado').innerHTML = enunciado.definicion
      document.querySelector('#autor_enunciado').innerHTML = autor
      document.querySelector('#modulo_enunciado').innerHTML = enunciado.modulo
      document.querySelector('#ra_enunciado').innerHTML = enunciado.ra
      document.querySelector('#uf_enunciado').innerHTML = enunciado.uf
      document.querySelector('#fechaInicio_enunciado').innerHTML = enunciado.fecha_inicio.split('T')[0]
      document.querySelector('#fechaFinal_enunciado').innerHTML = enunciado.fecha_final.split('T')[0]
      document.querySelector('#estado_enunciado').innerHTML = enunciado.estado
      document.querySelector('#actualizado_enunciado').innerHTML = enunciado.created_at.split('T')[0]



      document.querySelector('#enlace_enunciado').innerHTML = enunciado.enlace
      document.querySelector('#enlace_enunciado').setAttribute('href', enunciado.enlace)
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
          enunciado_id: id
        }
        await Comentario.create(datosComentario)
        inputComentario.value = ''
        inputComentario.focus()

        pintaTablaComentarios()
      })
    } catch (error) {
      console.log(error)
      alert('Error al mostrar el enunciado' + error)
    }
    
    
  }


}
