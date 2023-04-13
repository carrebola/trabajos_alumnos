export const estrellas = (valor) => {
  let estrellas = '<div class="estrellas">'
  for (let i = 1; i < 6; i++) {
    if (valor < i) {
      estrellas += '<div class="estrella no-activa"></div>'
    } else {
      estrellas += '<div class="estrella activa"></div>'
    }
  }
  estrellas += '</div>'
  return estrellas
}
