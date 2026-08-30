// ==========================================
// CATTERIN-DEV
// JavaScript principal
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const texto = document.getElementById("texto-dinamico");

    const profesiones = [
        "Análisis de Datos 📊",
        "Python 🐍",
        "Automatización ⚙️",
        "Visualización de Datos 📈",
        "Investigación Aplicada 🔬"
    ];

    let indice = 0;
    let posicion = 0;
    let borrando = false;

    function escribir() {

        const palabra = profesiones[indice];

        if (!borrando) {

            texto.textContent = palabra.substring(0, posicion + 1);
            posicion++;

            if (posicion === palabra.length) {

                borrando = true;

                setTimeout(escribir, 1800);
                return;
            }

        } else {

            texto.textContent = palabra.substring(0, posicion - 1);
            posicion--;

            if (posicion === 0) {

                borrando = false;

                indice++;

                if (indice >= profesiones.length) {
                    indice = 0;
                }
            }
        }

        setTimeout(escribir, borrando ? 45 : 80);
    }

    escribir();

});
