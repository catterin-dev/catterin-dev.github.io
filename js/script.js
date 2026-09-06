/* =====================================================
   TEXTO DINÁMICO
===================================================== */

const textos = [
    "Python 🐍",
    "Análisis de datos 📊",
    "Automatización ⚙️",
    "Estadística 📈"
];

const elementoTexto = document.getElementById("texto-dinamico");

let indiceTexto = 0;
let indiceCaracter = 0;
let borrando = false;

function escribirTexto() {

    const textoActual = textos[indiceTexto];

    if (!borrando) {

        elementoTexto.textContent =
            textoActual.substring(0, indiceCaracter + 1);

        indiceCaracter++;

        if (indiceCaracter === textoActual.length) {

            borrando = true;

            setTimeout(escribirTexto, 1800);

            return;
        }

    } else {

        elementoTexto.textContent =
            textoActual.substring(0, indiceCaracter - 1);

        indiceCaracter--;

        if (indiceCaracter === 0) {

            borrando = false;

            indiceTexto =
                (indiceTexto + 1) % textos.length;
        }
    }

    setTimeout(
        escribirTexto,
        borrando ? 50 : 100
    );
}

escribirTexto();

/* =====================================================
   PARTÍCULAS MORADAS ANIMADAS
===================================================== */

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

const mouse = {
    x: null,
    y: null
};

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* REACCIÓN AL CURSOR */

window.addEventListener("mousemove", function (event) {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

window.addEventListener("mouseleave", function () {

    mouse.x = null;
    mouse.y = null;

});

/* CLASE PARTICULA */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2.5 + 1;

        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        /* REACCIÓN AL CURSOR */

        if (mouse.x !== null && mouse.y !== null) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            const radius = 120;

            if (distance < radius && distance > 0) {

                const fuerza =
                    (radius - distance) / radius;

                this.x +=
                    (dx / distance) * fuerza * 2;

                this.y +=
                    (dy / distance) * fuerza * 2;
            }
        }

        /* APARECER POR EL OTRO LADO */

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(118, 87, 217, 0.55)";

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "rgba(118, 87, 217, 0.5)";

        ctx.fill();
    }
}

/* CREAR PARTÍCULAS */

function createParticles() {

    particles = [];

    let cantidad;

    if (window.innerWidth < 600) {
        cantidad = 35;
    } else {
        cantidad = 80;
    }

    for (let i = 0; i < cantidad; i++) {
        particles.push(new Particle());
    }
}

createParticles();

/* CONECTAR PARTÍCULAS */

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x - particles[b].x;

            const dy =
                particles[a].y - particles[b].y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (distance < 100) {

                const opacity =
                    1 - distance / 100;

                ctx.strokeStyle =
                    `rgba(118, 87, 217, ${opacity * 0.12})`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

/* ANIMACIÓN DE PARTÍCULAS */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(function (particle) {

        particle.update();
        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(animateParticles);
}

animateParticles();

/* =====================================================
   DESTELLO DEL CURSOR
===================================================== */

let ultimaPosicionX = 0;
let ultimaPosicionY = 0;
let temporizadorCursor;

function crearDestello(x, y) {

    const destello = document.createElement("span");

    destello.className = "cursor-spark";

    destello.style.left = `${x}px`;
    destello.style.top = `${y}px`;

    document.body.appendChild(destello);

    setTimeout(function () {
        destello.remove();
    }, 700);
}

function crearBrillo(x, y) {

    const brillo = document.createElement("span");

    brillo.className = "cursor-glow";

    brillo.style.left = `${x}px`;
    brillo.style.top = `${y}px`;

    document.body.appendChild(brillo);

    setTimeout(function () {
        brillo.remove();
    }, 1000);
}

window.addEventListener("mousemove", function (event) {

    const diferenciaX =
        Math.abs(event.clientX - ultimaPosicionX);

    const diferenciaY =
        Math.abs(event.clientY - ultimaPosicionY);

    if (diferenciaX > 12 || diferenciaY > 12) {

        crearDestello(
            event.clientX,
            event.clientY
        );

        ultimaPosicionX = event.clientX;
        ultimaPosicionY = event.clientY;
    }

    clearTimeout(temporizadorCursor);

    temporizadorCursor = setTimeout(function () {

        crearBrillo(
            event.clientX,
            event.clientY
        );

    }, 350);

});

/* DESTELLO AL HACER CLIC */

window.addEventListener("click", function (event) {

    crearDestello(
        event.clientX,
        event.clientY
    );

    crearDestello(
        event.clientX,
        event.clientY
    );

});
