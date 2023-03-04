//Importamos la conexión a la base de datos
import { supabase } from "./supabase";

import { createClient } from '@supabase/supabase-js'

export class Perfil {
  // Mapping de propiedades de la tabla perfiles
  constructor(id=null, nombre=null, apellidos=null, user_id=null, estado=null, rol=null, avatar=null) {
    this.id = id
    this.nombre = nombre
    this.apellidos = apellidos
    this.user_id = user_id
    this.estado = estado
    this.rol = rol
    this.avatar = avatar
  }

  static async getAll() {

    const { data: perfiles, error } = await supabase
      .from('perfiles')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    //devuelve array de objetos 
    return perfiles.map(({ id, nombre, apellidos, user_id, estado, rol, avatar }) => {
      return new Perfil(id, nombre, apellidos, user_id, estado, rol, avatar)
    })
  }

  static async getById(id) {
    const { data: perfil, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Perfil(perfil.id, perfil.nombre, perfil.apellidos, perfil.user_id, perfil.estado, perfil.rol, perfil.avatar)
  }
  
  static async create(perfilData) {    
    const { error } = await supabase
      .from('perfiles')
      .insert(perfilData)
      .select()
      console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
  }

  async update() {
    const { error } = await supabase
      .from('perfiles')
      .update({
        nombre: this.nombre,
        apellidos: this.apellidos,
        avatar: this.avatar
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
  }

  async delete() {
    const { error } = await supabase
      .from('perfiles')
      .delete()
      .eq('id', this.id)

    if (error) {
      throw new Error(error.message)
    }
  }
}




