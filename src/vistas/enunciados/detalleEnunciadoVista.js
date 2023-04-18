import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Enunciado } from '../../bd/enunciado'
import { Comentario } from '../../bd/comentario'
import { EnunciadoRubricaDetalle } from '../../bd/enunciadoRubrica'
import { Rubrica } from '../../bd/rubrica'
export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <a href="#/enunciados" class="btn btn-outline-secondary btn-sm">< Enunciados</a>
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
      <div class="bg-dark p-2 mt-2 mb-4" id="definicion_enunciado"></div>
      <div class="d-flex justify-content-between">
        <h3 class="">Rúbricas asociadas:</h3>
        <div>
          <button class="btn btn-success btn-sm mb-2">Añadir rúbrica</button>
        </div>
      </div>
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
      async function pintaTablaRubricasSeleccion () {
        // Leermos todas las rubricas y las del enunciado
        const rubricas = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(enunciado.id)
        const rubricasTodas = await Rubrica.getAll()

        let tabla = `
        <table class="table">
          <thead class="">
            
            <th>NOMBRE</th>
            <th>DESCRIPCIÓN</th>
            <th>PESO PONDERACIÓN.</th>
            <th></th></tr>
          </thead>
          <tbody>
        `
        // ordenamos todas las rubricas en orden descendiente por peso
        rubricasTodas.sort(element => element.peso).reverse()

        rubricasTodas.forEach(rubrica => {
          console.log('rubricas', rubricas)
          console.log('rubricasTodas', rubricasTodas)
          console.log('rubricaid', rubrica.id)
          const rubricaBuscada = rubricas.findIndex(element => rubrica.id === element.rubrica_id)
          const peso = rubricaBuscada >= 0 ? rubricas[rubricaBuscada].peso : 0
          console.log('peso', peso)
          const boton = rubricaBuscada >= 0 ? `<button data-enunciado_id = '${enunciado.id}' data-rubrica_id = '${rubrica.id}' data-id = '${rubricas[rubricaBuscada]}' class='btn btn-primary borrar'>Quitar</button>` : `<button data-enunciado_id = '${enunciado.id}' data-rubrica_id = '${rubrica.id}' data-id = '${rubricas[rubricaBuscada]}' class='btn btn-success insertar'>Añadir</button>`

          tabla += `
          <tr>
            <td>${rubrica.nombre}</td>
            <td>${rubrica.descripcion}</td>
            <td><input type='number' min = '0' max = '100' value = '${peso}'></input></td>
            <td>
              ${boton}
            </td>
          </tr>
          `
        })
        tabla += '</tbody></table>'
        document.querySelector('#rubricas').innerHTML = tabla
      }

      pintaTablaRubricasSeleccion()
    } catch (error) {
      console.log(error)
      alert('Error al mostrar el enunciado' + error)
    }

    document.querySelector('body').addEventListener('click', async (e) => {
      if (e.target.dataset.enunciado_id) {
        const enunciado_id = e.target.dataset.enunciado_id
        const rubrica_id = e.target.dataset.rubrica_id
        const id = e.target.dataset.id
        console.log(enunciado_id, rubrica_id)
      }
      if (e.target.classList.contains('borrar')) {
        console.log('borrar')
        try {
          await EnunciadoRubricaDetalle.delete(id)
          pintaTablaRubricasSeleccion()
        } catch (error) {
          console.log('Error al eliminar la rúbrica del enunciado ', error)
        }
      } else if (e.target.classList.contains('insertar')) {
        console.log('insertar')
      }
    })
  }

}
