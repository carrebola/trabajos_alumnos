//Importamos la conexión a la base de datos
import { supabase } from "./supabase.js";

export class Proyecto {
  // Mapping de propiedades de la tabla proyectos
  constructor(id=null, nombre=null, descripcion=null, user_id=null, nota=null) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.nota = nota
  }

  //leer todos
  static async getAll() {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    //devuelve array de objetos 
    return proyectos.map(({ id, nombre, descripcion, user_id, nota}) => {
      return new Proyecto(id, nombre, descripcion, user_id, nota)
    })
  }

  //leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById(id) {
    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Proyecto(proyecto.id, proyecto.nombre, proyecto.descripcion, proyecto.user_id, proyecto.nota)
  }
  
  //crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(proyectoData) {    
    const { error } = await supabase
      .from('proyectos')
      .insert(proyectoData)
      .select()
      console.log('nuevo proyecto ',error);
    if (error) {
      throw new Error(error.message)
    }
  }

  //actualizar
  async update() {
    const { error } = await supabase
      .from('proyectos')
      .update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        user_id: this.user_id,
        nota: this.nota
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
  }

  //borrar
  async delete() {
    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', this.id)

    if (error) {
      throw new Error(error.message)
    }
  }
}




