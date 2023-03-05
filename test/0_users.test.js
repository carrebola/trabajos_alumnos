
import  { expect } from 'chai'

import { supabase } from '../src/bd/supabase.js';
import { User } from '../src/bd/user.js';
let ArrayUsersRegistrados = []

//Testeando la clase User

describe('User: Crearemos 4 usuarios. ', async function() {

  let user

  describe('create()', async function() {
    it('debería crear un nuevo user en la tabla "users"', async function() {
      
      const ArrayUsers = [
        {
          email: 'carrebola@fpllefia.com',
          password: '123456',
        },
        {
          email: 'cadmin@fpllefia.com',
          password: '123456',    
        },
        {
          email: 'arrebola.c@gmail.com',
          password: '123456',     
        },
        {
          email: 'meborraran@email.com',
          password: '123456',
        }
      ]
        
      const perfilDevuelto = {
        email: 'meborraran@email.com',
        password: '123456',
      }

      // Crear el nuevo usuario (DEBEMOS HACERLO UNO A UNO)
      ArrayUsersRegistrados[0] = await User.create(ArrayUsers[0])
      //ArrayUsersRegistrados[1] = await User.create(ArrayUsers[1])
      //ArrayUsersRegistrados[2] = await User.create(ArrayUsers[2])
      //ArrayUsersRegistrados[3] = await User.create(ArrayUsers[3])

      console.log(ArrayUsersRegistrados[0]);
      // Verificar que se ha creado el perfil correctamente
      // const { data: users } = await supabase.from('users').select('*').order('created_at')
      // expect(users).to.be.an('array')
      // expect(users.length).to.equal(4)
      // expect(users[3]).to.include(perfilDevuelto)
    })
  })

})

  
