
// Objeto con todas las rutas y su vista asociada
const rutas = {
  '#/home': import('../vistas/homeVista.js'),
  '#/adminUsuarios': import('../vistas/adminVista.js'),
  '#/registro': import('../vistas/registroVista.js'),
  '#/login': import('../vistas/loginVista.js')
}

// Función que obtiene la ruta del navegador
const router = async () => {
  // Capturamos el hash # que ha cambiado en la url
  const path = window.location.hash

  // capturamos el componente con ese nombre de la vista
  const componenteVista = await rutas[path]
  // Si existe la vista la podremos cargar
  try {
    // Obtenemos el objeto del componente
    const vista = await componenteVista.default
    // inyectamos vista y ejecutamos su script
    document.querySelector('main').innerHTML = vista.template
    vista.script()
  } catch (error) {
    // Si se produce un error cargamos la vista 404
    console.log(error)
  }
}

// Capturamos los eventos
export const observadorRutas = () => {
  // Capturamos eventos de los enlaces
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', event => {
      // Evitamos que se cargue la página
      event.preventDefault()
      // Obtenemos la ruta del enlace sin el .html
      const href = link.getAttribute('href')
      // Añadimos la nueva ruta al historial
      history.pushState({ path: href }, '', href)
      router()
    })
  })

  // Detectamos los cambios en barra de navegación
  window.addEventListener('hashchange', () => {
    router()
  })

  window.addEventListener('popstate', () => {
    router()
  })
  window.addEventListener('load', () => {
    router()
  })
}
