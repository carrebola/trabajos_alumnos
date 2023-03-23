// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Importamos componentes header y footer
import { header } from './componentes/header'
import { footer } from './componentes/footer'

// Importamos la Función para detectar eventos al cargar las vistas
import { observadorRutas } from './componentes/router'

document.querySelector('#header').innerHTML = header.template
header.script()
document.querySelector('#footer').innerHTML = footer.template

observadorRutas()

// Cargamos la página home
window.location = '#/home'
