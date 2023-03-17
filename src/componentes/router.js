
// Objeto con todas las rutas y su vista asociada
const rutas = {
  '/': import('../vistas/homeVista.js'),
  '/admin': import('../vistas/adminVista.js'),
  '/registro': import('../vistas/registroVista.js'),
  '/login': import('../vistas/loginVista.js')
}

// Función que obtiene la rauta del navegador
const router = async () => {
  console.log('router escuchando')

  // ruta del navegador
  const path = window.location.hash.slice(1)
  console.log('se ha producido un cambio en la ruta', path)
  // nombre de la vista
  const componenteVista = await rutas[path]
  try {
    const vista = await componenteVista.default
    // console.log(vista.template)

    // inyectamos vista y ejecutamos su script
    document.querySelector('main').innerHTML = vista.template
    vista.script()
  } catch (error) {
    document.querySelector('main').innerHTML = '<h1>404</h1>'
  }
}

export const observadorRutas = () => {
  window.addEventListener('hashchange', router)
  window.addEventListener('popstate', router)
  window.addEventListener('load', router)
}
