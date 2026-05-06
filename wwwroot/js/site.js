// ============================================
// CATÁLOGO CLASH ROYALE - JS DE EFECTOS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    crearLluviaElixir();
    activarTilt3D();
    activarParticulasAlClick();
    activarRippleFiltros();
    animarContadoresElixir();
    detectarFormularioGuardado();
});

// === LLUVIA DE ELIXIR EN EL FONDO ===
function crearLluviaElixir() {
    const rain = document.createElement('div');
    rain.className = 'cr-rain';
    document.body.appendChild(rain);

    const cantidadGotas = 25;
    for (let i = 0; i < cantidadGotas; i++) {
        const gota = document.createElement('div');
        gota.className = 'cr-drop';
        gota.style.left = Math.random() * 100 + '%';
        gota.style.animationDuration = (Math.random() * 4 + 4) + 's';
        gota.style.animationDelay = Math.random() * 5 + 's';
        gota.style.transform = `rotate(-45deg) scale(${0.5 + Math.random()})`;
        rain.appendChild(gota);
    }
}

// === EFECTO TILT 3D AL HACER HOVER EN CARTAS ===
function activarTilt3D() {
    const cartas = document.querySelectorAll('.cr-card');

    cartas.forEach(carta => {
        carta.addEventListener('mousemove', function (e) {
            const rect = carta.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            carta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        carta.addEventListener('mouseleave', function () {
            carta.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// === EXPLOSIÓN DE PARTÍCULAS AL CLIC ===
function activarParticulasAlClick() {
    document.addEventListener('click', function (e) {
        // Solo en botones, links y cartas
        const target = e.target.closest('.cr-card, .cr-filtro, .cr-agregar, .cr-volver, .cr-btn-guardar, .cr-cta-grande');
        if (!target) return;

        crearExplosionParticulas(e.clientX, e.clientY);
    });
}

function crearExplosionParticulas(x, y) {
    const cantidad = 12;
    for (let i = 0; i < cantidad; i++) {
        const particula = document.createElement('div');
        particula.className = 'cr-particle';
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        document.body.appendChild(particula);

        const angulo = (Math.PI * 2 * i) / cantidad;
        const velocidad = 80 + Math.random() * 60;
        const dx = Math.cos(angulo) * velocidad;
        const dy = Math.sin(angulo) * velocidad;
        const duracion = 600 + Math.random() * 400;

        particula.animate(
            [
                { transform: 'translate(0, 0) rotate(-45deg) scale(1)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) rotate(-45deg) scale(0)`, opacity: 0 }
            ],
            {
                duration: duracion,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            }
        );

        setTimeout(() => particula.remove(), duracion);
    }
}

// === EFECTO RIPPLE EN FILTROS ===
function activarRippleFiltros() {
    const filtros = document.querySelectorAll('.cr-filtro');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'cr-ripple';
            const rect = filtro.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            filtro.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// === CONTADOR ANIMADO DE ELIXIR ===
function animarContadoresElixir() {
    const numeros = document.querySelectorAll('.cr-elixir-num');

    numeros.forEach(num => {
        const valorFinal = parseInt(num.textContent);
        if (isNaN(valorFinal)) return;

        let valorActual = 0;
        const incremento = Math.max(1, Math.ceil(valorFinal / 15));
        const intervalo = setInterval(() => {
            valorActual += incremento;
            if (valorActual >= valorFinal) {
                valorActual = valorFinal;
                clearInterval(intervalo);
            }
            num.textContent = valorActual;
        }, 50);
    });
}

// === CONFETTI AL AGREGAR CARTA ===
function detectarFormularioGuardado() {
    // Si venimos de agregar una carta, la URL será /Catalogo después de un POST
    // Detectamos esto con sessionStorage
    if (sessionStorage.getItem('cartaAgregada') === 'true') {
        sessionStorage.removeItem('cartaAgregada');
        lanzarConfetti();
    }

    // En el formulario, marcamos que vamos a agregar
    const formAgregar = document.querySelector('form[action*="Agregar"]');
    if (formAgregar) {
        formAgregar.addEventListener('submit', function () {
            sessionStorage.setItem('cartaAgregada', 'true');
        });
    }
}

function lanzarConfetti() {
    const colores = ['#f9d423', '#ffb300', '#ffeb3b', '#fff', '#d946c4'];
    const cantidad = 80;

    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'cr-confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.background = colores[Math.floor(Math.random() * colores.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.animationDuration = (1.5 + Math.random()) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// === SONIDOS (DESACTIVADO POR DEFECTO) ===
// Si quieres activar sonidos, descomenta este bloque y agrega
// archivos de sonido en wwwroot/sounds/click.mp3 y wwwroot/sounds/success.mp3
/*
function reproducirClick() {
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => { });
}

document.addEventListener('click', function (e) {
    if (e.target.closest('.cr-card, .cr-filtro, .cr-agregar, .cr-volver, .cr-btn-guardar')) {
        reproducirClick();
    }
});
*/