import { Semana } from '../bd/semanas'

export const tablaTareas = {
  template: `
  <div id="marcador" class="position-absolute border-end border-success h-100 ms-1" style="width: 1200px; background-color: rgb(50,50,50,0.2);"></div>

    <div class="fechas d-flex flex-wrap m-1">
      
    </div>
  </div>
  `,
  script: async () => {
    // creamos la tabla con las fechas
    try {
      // Capturamos fecha y marcamos la linea
      let hoy = new Date()
      hoy = hoy.toISOString().split('T')[0]
      console.log('hoy', hoy)
      let posicionActual = 0

      let divFechas = ''
      const semanas = await Semana.getAll()
      semanas.forEach((element, index) => {
        console.log(element.fecha, hoy, index)
        if (element.fecha < hoy) posicionActual = index
        divFechas += `<div style="width: 100px;" class="fecha border text-center">semana ${element.semana} ${element.fecha}</div>`
      })
      document.querySelector('.fechas').innerHTML = divFechas
      document.querySelector('#marcador').style.width = 100 * posicionActual + 'px'
      window.scroll(posicionActual * 100, 0)
    } catch (error) {
      console.log(error)
    }
  }
}
