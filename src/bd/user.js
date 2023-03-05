//Importamos la conexión a la base de datos
import { supabase } from "./supabase.js";

export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor(id=null, email=null, password=null) {
    this.id = id
    this.email =  email
    this.password = password
  }
  
  //crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(userData) {    
    let { user, error } = await supabase.auth.signUp(userData)
    
    if (error) {
      throw new Error(error.message)
    }
    console.log('usuario creado correctamente ', user);
    return new User(user.id, user.email, user.password)
  }

  //login

  //logout

}




