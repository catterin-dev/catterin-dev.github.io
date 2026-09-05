const textos = [
    "Python 🐍",
    "Análisis de datos 📊",
    "Automatización ⚙️",
    "Estadística 📈"
];

const elemento = document.getElementById("texto-dinamico");

let indiceTexto = 0;
let indiceCaracter = 0;
let borrando = false;

function escribirTexto() {

    const textoActual = textos[indiceTexto];

    if (!borrando) {

        elemento.textContent =
            textoActual.substring(0, indiceCaracter + 1);

        indiceCaracter++;

        if (indiceCaracter === textoActual.length) {
            borrando = true;
            setTimeout(escribirTexto, 1800);
            return;
        }

    } else {

        elemento.textContent =
            textoActual.substring(0, indiceCaracter - 1);

        indiceCaracter--;

        if (indiceCaracter === 0) {
            borrando = false;
            indiceTexto = (indiceTexto + 1) % textos.length;
        }

    }

    setTimeout(escribirTexto, borrando ? 50 : 100);

}

escribirTexto();
