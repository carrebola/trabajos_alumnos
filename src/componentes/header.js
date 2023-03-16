import { formEditarUsuario } from "./formEditarUsuario"

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="home.html">
      <img
        src="/assets/logo_vanilla.svg"
        alt="Logo"
        width="50"
        height="50"
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
          <a class="nav-link" href="juegos.html">Juegos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="recursos.html">Recursos</a>
        </li>
        <li><hr /></li>
        
        <li class="nav-item">
          <a class="nav-link" href="adminUsuarios.html">Admin</a>
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
            <img
              src="/assets/avatar.svg"
              alt="Logo"
              width="50"
              height="50"
              class="d-inline-block align-text-top"
            />
          </div>
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="login.html">Login</a></li>
          <li>
            <a class="dropdown-item" href="registro.html">Registrate</a>
          </li>
          <li>
            <a
              data-bs-toggle="modal"
              data-bs-target="#editar"
              class="dropdown-item"
              href="editarPerfil.html"
              >Editar perfil</a
            >
          </li>
          <div class="dropdown-divider"></div>
          <li>
            <a class="dropdown-item" href="admin.html">Admin Usuarios</a>
          </li>
        </ul>
    </ul>

    
  </div>
</nav>

//Modals
${formEditarUsuario.template}
  `
}
