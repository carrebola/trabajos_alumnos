//Importamos la conexión a la base de datos
import { supabase } from "./supabase.js";

export class Nota {
  // Mapping de propiedades de la tabla notas
  constructor(id=null, nota=null, proyecto_id=null, user_id=null) {
    this.id = id
    this.nota = nota
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  //leer todos
  static async getAll() {
    const { data: notas, error } = await supabase
      .from('notas')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    //devuelve array de objetos 
    return notas.map(({ id, nota, proyecto_id, user_id }) => {
      return new Nota(id, nota, proyecto_id, user_id)
    })
  }

  //leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById(id) {
    const { data: nota, error } = await supabase
      .from('notas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Nota(nota.id, nota.nota, nota.proyecto_id, nota.user_id)
  }
  
  //crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(notaData) {    
    const { error } = await supabase
      .from('notas')
      .insert(notaData)
      .select()
      console.log('nuevo nota',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  //actualizar
  async update() {
    const { error } = await supabase
      .from('notas')
      .update({
        nota: this.nota,
        proyecto_id: this.proyecto_id,
        user_id: this.user_id
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  //borrar
  static async delete(id) {
    const { error } = await supabase
      .from('notas')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}




