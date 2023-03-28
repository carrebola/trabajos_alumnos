import { User } from '../../bd/user'
import { Proyecto } from '../../bd/proyecto'
export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Editar Proyecto</h1>
      <form id="formProyecto" class="p-3" novalidate>
        <label class="mt-3 form-label" for="user_id">User_id: </label>    
        <input
            id="user_id" 
            type="text" 
            class="form-control text-black-50 " 
            value="" 
            disabled
            
          /> 
          <label class="mt-3 form-label" for="id">Id proyecto: </label>
          <input
            id="id" 
            type="text" 
            class="form-control text-black-50" 
            value="" 
            disabled
          />  
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del proyecto" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="descripcion">Descripción: </label>
          <textarea 
            id="descripcion"
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="enlace">Enlace a producción</label>
          <input
              id="enlace"
              type="enlace"
              class="form-control"
              value=""
              placeholder = "http://miproyecto.com"
              required
          />
          <div class="invalid-feedback">El link no es correcto</div>
          <button type="submit" class="mt-5 btn btn-success">
              Actualizar proyecto
          </button>
          <button type="button" onclick="history.back()" class="mt-5 btn btn-primary">
              Cancelar
          </button>
      </form>
  </div>
</div>
    `,
  script: async (id) => {
    const formProyecto = document.querySelector('#formProyecto')
    try {
      const user = await User.getUser()
      const proyecto = await Proyecto.getById(id)

      formProyecto.nombre.value = proyecto.nombre
      formProyecto.descripcion.value = proyecto.descripcion
      formProyecto.enlace.value = proyecto.enlace
      formProyecto.user_id.value = user.id
      formProyecto.id.value = proyecto.id
    } catch (error) {
      console.log(error)
      alert('Error al editar proyecto' + error)
    }

    formProyecto.addEventListener('submit', async function (e) {
      e.preventDefault()

      try {
        // Objeto con datos para proyecto
        const proyectoEditado = await Proyecto.getById(id)
        // Actualizamos los datos del proyecto a editar
        proyectoEditado.nombre = document.querySelector('#nombre').value
        proyectoEditado.descripcion = document.querySelector('#descripcion').value
        // proyectoEditado.enlace = document.querySelector('#enlace').value,

        await proyectoEditado.update()
        alert('Proyecto editado con éxito')
        // Cargamos la página login
        window.location.href = '/#/proyectos'
      } catch (error) {
        console.log(error)
        alert('Error al editar proyecto ' + error)
      }
    })
  }
}
