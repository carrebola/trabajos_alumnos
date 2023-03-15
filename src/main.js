
// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// import 'bootswatch/dist/superhero/bootstrap.min.css'

import { home } from './vistas/home'
import { footer } from './componentes/footer'
import { header } from './componentes/header'
// import { pruebaSupabase } from './vistas/pruebaSupabase';

document.querySelector('#main').innerHTML = home.template
document.querySelector('#header').innerHTML = header.template
document.querySelector('#footer').innerHTML = footer.template
