//Importamos la conexión a la base de datos
import { supabase } from "./supabase.js";

export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor(email=null, password=null) {
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
  static async login(userData){
  //USER LOGIN
      let { data, error } = await supabase.auth.signInWithPassword(userData)
      if(error){
        throw new Error(error.message)
      }
      return data
  }

  //logout
  static async logout(){
    //USER LOGOUT
    let { error } = await supabase.auth.signOut()
    if(error){
      throw new Error(error.message)
    }
  } 
}




