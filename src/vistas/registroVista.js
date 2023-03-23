import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
export default {
  template: `
  <div
  class="vh-100 d-flex align-items-center justify-content-center"
  
>
  <div class="col-12 col-md-4">
      <h1 class="text-center p-2">Registro</h1>
      <form id="form_registro" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Manolito" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
          <input 
            id="apellidos"
            type="text" 
            class="form-control" 
            value="" 
            placeholder = "Gafotas Rotas" required 
            />
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="email">Email</label>
          <input
              id="email"
              type="email"
              class="form-control"
              value=""
              placeholder = "ychag@example.com"
              required
          />
          <div class="invalid-feedback">El email no es correcto</div>

          <label class="mt-3 form-label" for="nick">Contraseña: </label>
          <input
              id="contrasena"
              type="password"
              class="form-control"
              value=""
              pattern="[A-Za-z]{8,}"
              placeholder = "Contraseña"
              required
          />

          <div class="invalid-feedback">
              La contraseña debe contener 8 letras o más que deben ser mayusculas y minusculas, no se aceptan signos ni números
          </div>

          <button type="submit" class="mt-5 btn btn-success w-100">
              Enviar
          </button>
          <hr class="mt-5" />
          <button type="submit" class="mt-1 btn btn-primary w-100">
              Registrate con Google
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector('#form_registro').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        // Objeto con datos para el registro de user
        const usuario = {
          email: document.querySelector('#email').value,
          password: document.querySelector('#contrasena').value
        }
        const nuevoUser = await User.create(usuario)
        // Objeto con datos para perfil
        const perfilData = {
          nombre: document.querySelector('#nombre').value,
          apellidos: document.querySelector('#apellidos').value,
          email: document.querySelector('#email').value,
          user_id: nuevoUser.id // Tomamos el id que nos devuelve el registro
        }
        await Perfil.create(perfilData)
        alert('Usuario creado con éxito')
        // Cargamos la página login
        window.location.href = '/#/login'
      } catch (error) {
        console.log(error)
        alert('Error al crear usuario')
      }
    })
  }
}
