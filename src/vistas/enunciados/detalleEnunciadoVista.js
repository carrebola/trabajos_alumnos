import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Enunciado } from '../../bd/enunciado'
import { Comentario } from '../../bd/comentario'
import { EnunciadoRubricaDetalle } from '../../bd/enunciadoRubrica'
export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <h1 id="nombre_enunciado" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
        <img src="" class="w-400" alt="">
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
      <h3 class="mt-4">Rúbricas asociadas:</h3>
      <div id="rubricas">
        Aquí van las rubricas asociadas a este enunciado...
        
      </div>      
  </div>
</div>
    `,
  script: async (id) => {
    console.log('pagina cargada')
    try {
      const usuarioLogueado = await User.getUser()
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
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

      // Tabla rubricas

      const rubricas = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(enunciado.id)
      let tabla = `
      <table class="table">
        <thead>
          <tr><th>Nombre</th><th>Descripción</th><th>Peso ponderación</th></tr>
        </thead>
        <tbody>
      `
      rubricas.forEach(rubrica => {
        tabla += `
        <tr>
          <td>${rubrica.rubrica_nombre}</td>
          <td>${rubrica.rubrica_descripcion}</td>
          <td>${rubrica.peso}</td>
        </tr>
        `
      })
      tabla += '</tbody></table>'
      document.querySelector('#rubricas').innerHTML = tabla
      console.log('rubricas detalle ' ,rubricas);
    } catch (error) {
      console.log(error)
      alert('Error al mostrar el enunciado' + error)
    }
  }

}
