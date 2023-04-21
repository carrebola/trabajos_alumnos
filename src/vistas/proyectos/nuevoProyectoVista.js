import { User } from '../../bd/user'
import { Proyecto } from '../../bd/proyecto'
import { Enunciado } from '../../bd/enunciado'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <a href="#/proyectos" class="btn btn-outline-secondary btn-sm">< Proyectos</a>
      <h1 class="text-center p-2">Nuevo Proyecto</h1>
      <form id="form_proyecto" class="p-3" novalidate>
        <label class="mt-3 form-label" for="enunciado">Enunciado: </label>
          <select id="selectEnunciado" class="form-control" id="enunciado" required>
            <option value="">Selecciona el enunciado</option>
          </select>
          <div class="text">Si el proyecto se basa en un enunciado seleccionalo aquí</div>
        <div class="invalid-feedback">El nombre no es correcto</div>
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
              Crear nuevo proyecto
          </button>
      </form>
  </div>
</div>
    `,
  script: async (id_enunciado = -1) => {
    let enunciados = []
    let enunciado = {}
    try {
      enunciados = await Enunciado.getAll()
    } catch (error) {
      console.log(error)
    }
    if (id_enunciado) {
      enunciado = enunciados.filter(element => element.id == id_enunciado)[0]
    }
    // Insertamos los enunciados en el select
    const pintaEnunciados = async () => {
      let opciones = '<option value="-1" >Selecciona el enunciado</option>'
      console.log('enunciados ', enunciados)
      enunciados.forEach(element => {
        opciones += `<option value="${element.id}">${element.nombre}</option>`
      })
      document.querySelector('#selectEnunciado').innerHTML = opciones
      // Si venimos desde enunciado cargamos el valor del enunciado
      document.querySelector('#selectEnunciado').value = id_enunciado
      console.log('enunciado', enunciado)
      document.querySelector('#nombre').value = enunciado.nombre
      document.querySelector('#descripcion').value = enunciado.definicion
    }
    pintaEnunciados()

    // Si cambiamos el enunciado
    document.querySelector('#selectEnunciado').addEventListener('change', (e) => {
      if (e.target.value == -1) {
        document.querySelector('#nombre').value = ''
        document.querySelector('#descripcion').value = ''
      } else {
        const enunciadoSeleccionado = enunciados.filter(element => element.id == e.target.value)[0]
        document.querySelector('#nombre').value = enunciadoSeleccionado.nombre
        document.querySelector('#descripcion').value = enunciadoSeleccionado.definicion
      }
    })

    document.querySelector('#form_proyecto').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        const user = await User.getUser()

        // Objeto con datos para proyecto
        const proyecto = {
          nombre: document.querySelector('#nombre').value,
          descripcion: document.querySelector('#descripcion').value,
          enlace: document.querySelector('#enlace').value,
          user_id: user.id, // Tomamos el id del usuario logueado
          enunciado_id: document.querySelector('#selectEnunciado').value
        }
        await Proyecto.create(proyecto)
        // alert('Proyecto creado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/proyectos'
      } catch (error) {
        console.log(error)
        // alert('Error al crear rúbrica ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear la rúbrica ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
