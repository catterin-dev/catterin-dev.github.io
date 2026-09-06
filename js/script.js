/* =====================================================
   CATTERINE DEV - JAVASCRIPT
   ===================================================== */


/* =====================================================
   TEXTO DINAMICO
   ===================================================== */

const textoDinamico = document.getElementById("texto-dinamico");

const textos = [
    "Análisis de datos",
    "Programación en Python",
    "Automatización de procesos",
    "Visualización estadística",
    "Ciencia de datos"
];

let indiceTexto = 0;
let indiceLetra = 0;
let borrando = false;

function escribirTexto() {

    const textoActual = textos[indiceTexto];

    if (!borrando) {

        textoDinamico.textContent =
            textoActual.substring(0, indiceLetra + 1);

        indiceLetra++;

        if (indiceLetra === textoActual.length) {

            borrando = true;

            setTimeout(escribirTexto, 1800);

            return;
        }

    } else {

        textoDinamico.textContent =
            textoActual.substring(0, indiceLetra - 1);

        indiceLetra--;

        if (indiceLetra === 0) {

            borrando = false;

            indiceTexto++;

            if (indiceTexto === textos.length) {
                indiceTexto = 0;
            }

        }

    }

    setTimeout(escribirTexto, borrando ? 45 : 90);

}

escribirTexto();



/* =====================================================
   PARTICULAS MORADAS
   ===================================================== */

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


/* ---------- TAMAÑO DEL CANVAS ---------- */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);



/* ---------- CURSOR ---------- */

window.addEventListener("mousemove", function (event) {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

window.addEventListener("mouseleave", function () {

    mouse.x = null;
    mouse.y = null;

});



/* ---------- PARTICULA ---------- */

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


        /* REACCION AL CURSOR */

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

                this.x += (dx / distance) * fuerza * 2;
                this.y += (dy / distance) * fuerza * 2;

            }

        }


        /* REAPARECER POR EL OTRO LADO */

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



/* ---------- CREAR PARTICULAS ---------- */

function createParticles() {

    particles = [];

    let cantidad;

    if (window.innerWidth < 600) {

        cantidad = 35;

    } else {

        cantidad = 80;

    }

    for (let i = 0; i < cantidad; i++) {

        particles.push(
            new Particle()
        );

    }

}



/* ---------- CONECTAR PARTICULAS ---------- */

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

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



/* ---------- ANIMACION ---------- */

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


    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();
