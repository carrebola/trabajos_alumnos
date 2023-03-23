import { User } from '../bd/user'
import { Proyecto } from '../bd/proyecto'
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
    </div>
  </div>
</div>
    `,
  script: async (id) => {
    try {
      const proyecto = await Proyecto.getById(id)
      document.querySelector('#nombre_proyecto').innerHTML = proyecto.nombre
      document.querySelector('#descripcion_proyecto').innerHTML = proyecto.descripcion
      document.querySelector('#autor_proyecto').innerHTML = proyecto.user_id

      document.querySelector('#enlace_proyecto').innerHTML = proyecto.enlace
      document.querySelector('#enlace_proyecto').setAttribute('href', proyecto.enlace)
    } catch (error) {
      console.log(error)
      alert('Error al mostrar el proyecto' + error)
    }
  }
}
