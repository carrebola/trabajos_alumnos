-- Consulta para crear función proyectosTodosDetalle(user_id)

CREATE OR REPLACE FUNCTION proyectosTodosDetalleDeUsuarioID(usuarioID UUID)
RETURNS TABLE (
  id INT,
  created_at TIMESTAMP,
  nombre TEXT,
  descripcion TEXT,
  user_id UUID,
  activo BOOLEAN,
  enunciado_id INT,
  nombre_usuario TEXT,
  apellidos_usuario TEXT,
  nombre_enunciado TEXT,
  definicion_enunciado TEXT
)
LANGUAGE SQL
AS $$ 
SELECT DISTINCT
  proyectos.id,
  to_timestamp(proyectos.created_at::text, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
  proyectos.nombre,
  proyectos.descripcion,
  proyectos.user_id,
  proyectos.activo,
  proyectos.enunciado_id,
  perfiles.nombre AS nombre_usuario,
  perfiles.apellidos AS apellidos_usuario,
  enunciados.nombre AS nombre_enunciado,
  enunciados.definicion AS definicion_enunciado
FROM proyectos
INNER JOIN perfiles ON proyectos.user_id = usuarioID
INNER JOIN enunciados ON enunciados.id = proyectos.enunciado_id;
$$;


-- API JAVASCRIPT DE SUPABASE

let { data, error } = await supabase
  .rpc('proyectostodosdetalle', {
    usuarioid
  })

if (error) console.error(error)
else console.log(data)
