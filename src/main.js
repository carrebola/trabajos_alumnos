//Probando la clase perfil
import { Perfil } from './bd/perfil';

const nuevoPerfilData = {
    nombre: 'Juan',
    apellidos: 'Pérez',
    user_id: null,
    estado: 'activo',
    rol: 'admin',
    avatar: null
  }
  
  const nuevoPerfil = await Perfil.create(nuevoPerfilData)
  console.log(nuevoPerfil);
  console.log('perfilCreado');





// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { home } from "./vistas/home";
import { header } from "./componentes/header";
import { footer } from "./componentes/footer";
import { pruebaSupabase } from './vistas/pruebaSupabase';

document.querySelector('#main').innerHTML = pruebaSupabase.template
pruebaSupabase.script()
document.querySelector('#header').innerHTML = header.template;
document.querySelector('#footer').innerHTML = footer.template;

