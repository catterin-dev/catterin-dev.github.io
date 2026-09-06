/* =====================================================
   CATTERINE DEV — JAVASCRIPT
   ===================================================== */

/* ---------- MENÚ MOBILE ---------- */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


/* ---------- TEXTO DINÁMICO ---------- */

const textos = [
    "Análisis de datos 📊",
    "Automatización ⚙️",
    "Programación 🐍",
    "Investigación 🔬"
];

const elemento = document.getElementById("texto-dinamico");

let indiceTexto = 0;
let indiceCaracter = 0;
let borrando = false;

function escribirTexto() {

    if (!elemento) return;

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


/* ---------- ANIMACIÓN AL HACER SCROLL ---------- */

const elementos = document.querySelectorAll(
    ".info-card, .tech-card, .project-card, .experience-card, .education-card, .research-card"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

elementos.forEach(elemento => {
    observer.observe(elemento);
});


/* ---------- AÑO AUTOMÁTICO ---------- */

const footer = document.querySelector(".footer p");

if (footer) {

    footer.textContent =
        `© ${new Date().getFullYear()} Catterine Carely Quispe Quispe`;

}


/* ---------- INICIAR ---------- */

escribirTexto();
