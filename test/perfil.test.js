
// import  { expect } from 'chai'

// import { supabase } from '../src/bd/supabase.js';
// import { Perfil } from '../src/bd/perfil.js';


// //Testeando la clase perfil
// describe('Perfil', function() {
  
//   let perfil
//   // Antes de cada prueba, borrar todos los registros de la tabla 'perfiles'
//   beforeEach(async function() {
//     try {
//       const response = await supabase.from('perfiles').delete().eq('nombre','Pepe')
//       //console.log(response)
//     } catch (error) {
//       console.error(error)
//     }
//   })

//   describe('getAll()', async function() {
    


//     it('debería devolver un array de perfiles vacío', async function() {
//       const perfiles = await Perfil.getAll()
//       expect(perfiles).to.be.an('array')
//       expect(perfiles.length).to.equal(0)
//     })
//   })


//   describe('create()', async function() {
//     it('debería crear un nuevo perfil en la tabla "perfiles"', async function() {
//       // Datos para el nuevo perfil
//       const nuevoPerfilData = {
//         nombre: 'Pepe',
//         apellidos: 'Create',
//       }
//       const perfilDevuelto = {
//         nombre: 'Pepe',
//         apellidos: 'Create',
//         user_id: null,
//         estado: 'pendiente',
//         rol: 'registrado',
//         avatar: null
//       }

//       // Crear el nuevo perfil
//       await Perfil.create(nuevoPerfilData)

//       // Verificar que se ha creado el perfil correctamente
//       const { data: perfiles } = await supabase.from('perfiles').select('*')
//       expect(perfiles).to.be.an('array')
//       expect(perfiles.length).to.equal(1)
//       expect(perfiles[0]).to.include(perfilDevuelto)
//     })
//   })

//   describe('getById()', function() {
//     it('debería devolver el perfil con el ID correspondiente', async function() {
//       // Obtener el ID del perfil recién creado
//       const { data: perfiles } = await supabase.from('perfiles').select('id')
//       const perfilId = perfiles[0].id

//       // Obtener el perfil por ID
//       const perfil = await Perfil.getById(perfilId)
//       expect(perfil).to.be.an.instanceof(Perfil)
//     })
//   })

  

//   describe('actualizarPerfil', () => {
    
//     it('debería actualizar el nombre y apellido del perfil', async () => {
      
//       perfil.actualizarPerfil({ nombre: 'Pedro', apellido: 'Gómez' });
//       expect(perfil.nombre).toBe('Pedro');
//       expect(perfil.apellido).toBe('Gómez');
//     });

//     it('debería actualizar el correo electrónico del perfil', () => {
//       perfil.actualizarPerfil({ correo: 'pedrogomez@example.com' });
//       expect(perfil.correo).toBe('pedrogomez@example.com');
//     });

//     it('debería actualizar la contraseña del perfil', () => {
//       perfil.actualizarPerfil({ contraseña: 'abcdef' });
//       expect(perfil.contraseña).toBe('abcdef');
//     });

//     it('debería lanzar un error si se proporciona una propiedad no válida', () => {
//       expect(() => {
//         perfil.actualizarPerfil({ edad: 30 });
//       }).toThrowError('Propiedad no válida: edad');
//     });
//   });
// });
