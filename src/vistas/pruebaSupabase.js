import { createClient } from '@supabase/supabase-js'

export const pruebaSupabase = {
    template: `<h1>Pruebas Supabase</h1>`,
    script: async ()=>{
        console.log('purebas supabase');
        //Creando la conexión con supabase
        const supabaseUrl = 'https://ptnlczuiuaotrscavujw.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bmxjenVpdWFvdHJzY2F2dWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTAsImV4cCI6MTk5Mjc1MjYxMH0.CaOtS_kudjpUTJlnV4VfNU_5tZn1N8T0Uj9DkNjIecs'
        const supabase = createClient(supabaseUrl, supabaseKey)
        //console.log(supabase);

        //Consulta a la tabla perfiles
        const verTodosLosPerfiles = async ()=>{
        
                let { data: perfiles, error } = await supabase
                .from('perfiles')
                .select('*')
                return perfiles
                
        }
        let datos = await verTodosLosPerfiles(); 
        console.log(datos);
        

        //Agregar un nuevo perfil
        const agregarPerfil = async ()=>{
            //INSERT A ROW
            const { data, error } = await supabase
            .from('perfiles')
            .insert([
                { nombre: 'ejemplo'},
            ])
        }
        //await agregarPerfil()
        datos = await verTodosLosPerfiles(); 
        console.log(datos); 

        //Invocamos funcion proyectoDetalle
        

        const leerProyectosDetalle = async ()=>{
            //INVOKE FUNCTION
            let { data, error } = await supabase
            .rpc('proyectosdetalle')
        
            if (error) console.error(error)
            else console.log('leer proyectos detalle ', data)
        }
        await leerProyectosDetalle()

        //Registro de usuarios
        const registro = async ()=>{
            //USER SIGNUP
            let { data, error } = await supabase.auth.signUp({
              email: 'carrebola@fpllefia.com',
              password: '123456'
            })
        }
        //registro()
        const login = async ()=>{
        //USER LOGIN
            let { data, error } = await supabase.auth.signInWithPassword({
            email: 'carrebola@fpllefia.com',
            password: '123456'
            })
        }
        
        const logout = async ()=>{
            //USER LOGOUT
            let { error } = await supabase.auth.signOut()
        }
        
        const mostrarUsuarioLogeado = async ()=>{
            //GET USER
            const { data: { user } } = await supabase.auth.getUser()
            console.log('usuario logueado', user)
        }
        
        await mostrarUsuarioLogeado()
        await login()
        await mostrarUsuarioLogeado()
        await logout()
        await mostrarUsuarioLogeado()
    }
}