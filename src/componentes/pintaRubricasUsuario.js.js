// PINTARUBRICASUSUARIO()
const pintaRubricasUsuario = async () => {
  notas = await Nota.getAllByProjectId(proyectoD.id)

  // Si recibe user_id pinta la nota que el usuario a puesto y las estrellas, sino, pinta la media de alumnos y las estrellas
  const rubricasDetalle = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(proyectoD.enunciado_id)
  console.log('rubricas detalle ', rubricasDetalle)

  let HTMLlistaRubricas = '<ul class="list-group list-group-flush">'
  rubricasDetalle.forEach(element => {
    let nota
    let id
    console.log('notas', notas)
    if (notas.length > 0) {
      const miNotaFiltrada = notas.filter(nota => nota.rubrica_id === element.rubrica_id && nota.user_id === proyectoD.user_id)
      if (miNotaFiltrada.length > 0) {
        nota = miNotaFiltrada[0].nota
        id = miNotaFiltrada[0].id
      }
    }
    const inputMiNota = `
      <input 
        id = "inputMiNota" 
        class = "nota" 
        type = "number" 
        min = "0" max = "5" 
        value = "${nota}"
        data-id = "${id}"
        data-userId = "${proyectoD.user_id}"
        data-rubricaId = "${element.rubrica_id}"
        data-proyectoId = "${proyectoD.id}" 
        data-nota = "${nota}"
      />`
    const info = inputMiNota + ' ' + estrellas(Math.round(nota))

    HTMLlistaRubricas += `
    <li class="list-group-item d-flex justify-content-between ">   
      ${element.rubrica_nombre} (${element.peso}/100) 
      <span class="d-flex">
      ${info} 
      </span>
    </li>`
  })
  HTMLlistaRubricas += '</ul>'
  const vp = document.querySelector('#valoracionPersonal')
  vp.innerHTML = HTMLlistaRubricas
}
