// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Archivo {
  
  // Subir un archivo a un bucket determinado
  // file sería lo que devuelve el value de un input tipo file
  async uploadFile(bucket, file) {
    const { data, error } = await supabase.storage.from(bucket).upload(file.name, file);
    
    if (error) {
      throw new Error(`Error al subir el archivo: ${error.message}`);
    }
    
    return data;
  }

  // Devuelve una url a partir de la key de la imagen
  async getFile(bucket, key) {
    const { data, error } = await supabase.storage.from(bucket).getPublicUrl(key);
    
    if (error) {
      throw new Error(`Error al obtener el archivo: ${error.message}`);
    }
    
    return data;
  }

  // Borra un archivo a partir de su key
  async deleteFile(bucket, key) {
    const { error } = await supabase.storage.from(bucket).remove([key]);
    
    if (error) {
      throw new Error(`Error al eliminar el archivo: ${error.message}`);
    }
  }
  
}
