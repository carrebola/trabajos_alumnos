
import  { expect } from 'chai'
import { supabase } from '../src/bd/supabase'
import { createClient } from '@supabase/supabase-js'
import { Perfil } from '../src/bd/perfil'


import  { expect } from 'chai'
import { supabase } from '../src/bd/supabase'
import { createClient } from '@supabase/supabase-js'
import { Perfil } from '../src/bd/perfil'


//Testeando la clase perfil
describe('Perfil', function() {
  let perfil
  // Antes de cada prueba, borrar todos los registros de la tabla 'perfiles'
  beforeEach(async function() {
    await supabase.from('perfiles').delete()
  })

  describe('getAll()', function() {
    it('debería devolver un array de perfiles vacío', async function() {
      const perfiles = await Perfil.getAll()
      expect(perfiles).to.be.an('array')
      expect(perfiles.length).to.equal(0)
    })
  })

  describe('getById()', function() {
    it('debería devolver el perfil con el ID correspondiente', async function() {
      // Crear un nuevo perfil
      const nuevoPerfilData = {
        nombre: 'Juan',
        apellidos: 'Pérez',
        user_id: null,
        estado: 'pendiente',
        rol: 'registrado',
        avatar: null
      }
      await supabase.from('perfiles').insert(nuevoPerfilData)

      // Obtener el ID del perfil recién creado
      const { data: perfiles } = await supabase.from('perfiles').select('id')
      const perfilId = perfiles[0].id

      // Obtener el perfil por ID
      const perfil = await Perfil.getById(perfilId)
      expect(perfil).to.be.an.instanceof(Perfil)
      expect(perfil.id).to.equal(perfilId)
      expect(perfil.nombre).to.equal(nuevoPerfilData.nombre)
      expect(perfil.apellidos).to.equal(nuevoPerfilData.apellidos)
      expect(perfil.user_id).to.equal(nuevoPerfilData.user_id)
      expect(perfil.estado).to.equal(nuevoPerfilData.estado)
      expect(perfil.rol).to.equal(nuevoPerfilData.rol)
      expect(perfil.avatar).to.equal(nuevoPerfilData.avatar)
    })
  })

  describe('create()', async function() {
    it('debería crear un nuevo perfil en la tabla "perfiles"', async function() {
      // Datos para el nuevo perfil
      const nuevoPerfilData = {
        nombre: 'Juan',
        apellidos: 'Pérez',
      }

      // Crear el nuevo perfil
      await Perfil.create(nuevoPerfilData)

      // Verificar que se ha creado el perfil correctamente
      const { data: perfiles } = await supabase.from('perfiles').select('*')
      expect(perfiles).to.be.an('array')
      expect(perfiles.length).to.equal(1)
      expect(perfiles[0]).to.include(nuevoPerfilData)
    })
  })

  describe('actualizarPerfil', () => {
    
    it('debería actualizar el nombre y apellido del perfil', async () => {
      
      perfil.actualizarPerfil({ nombre: 'Pedro', apellido: 'Gómez' });
      expect(perfil.nombre).toBe('Pedro');
      expect(perfil.apellido).toBe('Gómez');
    });

    it('debería actualizar el correo electrónico del perfil', () => {
      perfil.actualizarPerfil({ correo: 'pedrogomez@example.com' });
      expect(perfil.correo).toBe('pedrogomez@example.com');
    });

    it('debería actualizar la contraseña del perfil', () => {
      perfil.actualizarPerfil({ contraseña: 'abcdef' });
      expect(perfil.contraseña).toBe('abcdef');
    });

    it('debería lanzar un error si se proporciona una propiedad no válida', () => {
      expect(() => {
        perfil.actualizarPerfil({ edad: 30 });
      }).toThrowError('Propiedad no válida: edad');
    });
  });
});
