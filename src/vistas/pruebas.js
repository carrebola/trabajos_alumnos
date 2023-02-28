




import { createClient } from '@supabase/supabase-js'

export const pruebas = {
    template: `<h1>Pruebas</h1>`,
    script: async ()=>{
        console.log('Vista pruebas cargada');

        //Conexión con supabase
        
        const supabaseUrl = 'https://ptnlczuiuaotrscavujw.supabase.co'

        //const supabaseKey = process.env.SUPABASE_KEY
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bmxjenVpdWFvdHJzY2F2dWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTAsImV4cCI6MTk5Mjc1MjYxMH0.CaOtS_kudjpUTJlnV4VfNU_5tZn1N8T0Uj9DkNjIecs'
        
        const supabase = createClient(supabaseUrl, supabaseKey)
        console.log('conexión a supabase: ', supabase);

        const leerTodosPerfiles = async ()=>{
            //READ ALL ROWS
            let { data: perfiles, error } = await supabase
            .from('perfiles')
            .select('*')

            console.log(perfiles);
        }
        

        //insertar nuevo perfil
        const agregarPerfil = async ()=>{
            //INSERT A ROW
            const { data, error } = await supabase
            .from('perfiles')
            .insert([
                { 
                    nombre: 'ejemplo'
                }
            ])
        }

        //proyectosDetalle a partir de funcion postgreeSQL
        const leerProyectosDetalle = async ()=>{
            //INVOKE FUNCTION
            let { data, error } = await supabase
            .rpc('proyectosdetalle')

            if (error) console.error(error)
            else console.log('proyectos con detalle: ' , data)
        }
        leerProyectosDetalle()

        
        
        






    }
}