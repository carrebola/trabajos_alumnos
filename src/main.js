// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// import 'bootswatch/dist/superhero/bootstrap.min.css'

import { header } from './componentes/header'
import { footer } from './componentes/footer'
// registroVista.script()
// home.script()

// Escuchamos cambios en la url del navegador
import { observadorRutas } from './componentes/router'
// import { pruebaSupabase } from './vistas/pruebaSupabase';

const componentelogin = await import('./vistas/loginVista')
const loginVista = componentelogin.default
document.querySelector('#main').innerHTML = loginVista.template
document.querySelector('#header').innerHTML = header.template
document.querySelector('#footer').innerHTML = footer.template

loginVista.script()
observadorRutas()
