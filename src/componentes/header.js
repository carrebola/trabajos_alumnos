export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="home.html">
      <img
        src="../public/images/logo.svg"
        alt="Logo"
        width="50"
        height="50"
        class="d-inline-block align-text-top"
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
          <div class="avatarLogin d-inline-block"></div>
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

<!-- Modal -->
<div class="modal fade" id="editar">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar usuario</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <form class="p-3">
          <label class="mt-3 form-label" for="nick">Nick: </label>
          <input type="text" class="form-control" value="Charly" />

          <label class="mt-3 form-label" for="email">Email</label>
          <input
            type="email"
            class="form-control"
            value="email@gmail.com"
          />

          <label class="mt-3 form-label" for="nick">Contraseña: </label>
          <input type="password" class="form-control" value="123456" />
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">
          Guardar cambios
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
  `
}
