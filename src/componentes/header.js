import { formEditarPerfil } from './formEditarPerfil'
import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <img
        src="/assets/logo_vanilla.svg"
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top me-2"
      />
      <span class=""></span>
      Vanilla Games
    </a>
    
    <button
      class="navbar-toggler ms-auto
      "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#/proyectos">Proyectos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/recursos">Recursos</a>
        </li>
        <li><hr /></li>
        
        <li class="nav-item">
          <a class="nav-link" href="#/adminUsuarios">Admin</a>
        </li>
        
      </li>
      </ul>
      
    </div>
    <!-- login -->
    <ul class="navbar nav me-5">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="avatarLogin d-inline-block">
          <span class="emailUsuarioLogueado pe-3 text-dark"></span>
            <img
              id="imgAvatar"
              src="/assets/avatar.svg"
              alt="Logo"
              width="30"
              height="30"
              class="d-inline-block align-text-top"
            />
          </div>
        </a>
        
        <ul class="dropdown-menu">
          <li><div class="emailUsuarioLogueado text-center fw-bold"></div></li>
          <li><hr></li>
          <li><a class="liLogin dropdown-item" href="#/login">Login</a></li>
          
          <li>
            <a class="liMisProyectos dropdown-item d-none" href="#/misProyectos">Mis Proyectos</a>
          </li>
          <li>
            <a class="liRegistro dropdown-item" href="#/registro">Registrate</a>
          </li>
          <li>
            <a
              id="editarPerfil"
              data-bs-toggle="modal"
              data-bs-target="#editar"
              class="dropdown-item"
              href="#/editarPerfil"
              >Editar perfil</a
            >
          </li>
          <div class="dropdown-divider"></div>
          <li>
            <a class="dropdown-item" href="#/adminUsuarios">Admin Usuarios</a>
          </li>
          <li><a class="liLogout d-none dropdown-item" href="">Logout</a></li>
        </ul>
    </ul>

    
  </div>
</nav>

//Modals
${formEditarPerfil.template}
  `,
  script: async () => {
    try {
      // Capturamos los datos del usuario logueado
      const usuarioLogueado = await User.getUser()
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)

      //Guardamose le perfil en el localstorage
      localStorage.setItem('perfilLogueado', JSON.stringify(perfilLogueado))
      // Leemos la url de la imagen que está en la carpeta user_id
      const imgAvatar = perfilLogueado.avatar

      // Si hay un usuario logueado pintamos el email en el header y en el menú del usuario
      const divUsuarioLogeado = document.querySelectorAll('.emailUsuarioLogueado')
      if (usuarioLogueado) {
        divUsuarioLogeado[0].innerHTML = usuarioLogueado.email
        divUsuarioLogeado[1].innerHTML = usuarioLogueado.email
        // Insertamos la foto del avatar
        document.querySelector('#imgAvatar').src = imgAvatar
        // y ocultamos la opción login del menu del usuario y la de registro
        document.querySelector('.liLogin').classList.add('d-none')
        document.querySelector('.liLogout').classList.remove('d-none')
        document.querySelector('.liRegistro').classList.add('d-none')
        document.querySelector('.liMisProyectos').classList.remove('d-none')
      }
    } catch (error) {
      alert('No he podido cargar el usuario logueado')
    }

    // Capturamos click en logout
    document.querySelector('.liLogout').addEventListener('click', async () => {
      // Cerramos sesión utilizando el método de logout de nuestra clase User
      await User.logout()
      // Borramos de header el email del usuario logueado
      divUsuarioLogeado[0].innerHTML = ''
      divUsuarioLogeado[1].innerHTML = ''
      // y ocultamos la opción login del menu del usuario y mostramos la opción de registro
      document.querySelector('.liLogout').classList.add('d-none')
      document.querySelector('.liLogin').classList.remove('d-none')
      document.querySelector('.liRegistro').classList.remove('d-none')
      document.querySelector('.liMisProyectos').classList.add('d-none')
    })

    // Gestionamos click en editar perfil
    document.querySelector('#editarPerfil').addEventListener('click', (e) => {
      e.preventDefault()
      formEditarPerfil.script()
    })
  }
}
