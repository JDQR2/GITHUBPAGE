// Variables globales
const FECHA_ESPECIAL = "6824"; // Cambiar por tu fecha especial (DDMM)
let musicaNavidad;

// Inicialización de audio
function iniciarMusica() {
    musicaNavidad = document.getElementById('backgroundMusic');
}

// Sistema de verificación
function verificarCodigo() {
    const codigo = document.getElementById('codeInput').value;
    
    if (codigo === FECHA_ESPECIAL) {
        mostrarPanelPrincipal();
        iniciarEfectosNavideños();
        mostrarNotificacion('💝 ¡Bienvenida mi amor!', 'success');
        if (musicaNavidad) musicaNavidad.play();
    } else {
        mostrarNotificacion('❤️ Intenta con nuestra fecha especial', 'info');
        document.getElementById('codeInput').value = '';
    }
}

function mostrarPanelPrincipal() {
    const loginPanel = document.getElementById('loginPanel');
    const mainPanel = document.getElementById('mainPanel');
    
    loginPanel.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
        loginPanel.style.display = 'none';
        mainPanel.style.display = 'block';
        mainPanel.style.animation = 'fadeIn 1s forwards';
    }, 500);
}

// Efectos visuales navideños
function iniciarEfectosNavideños() {
    iniciarNieve();
    animarCorazones();
    mostrarMensajesSecuenciales();
}

function iniciarNieve() {
    const simbolos = ['❄️', '🎄', '⭐', '💝', '🎁'];
    const cantidadCopos = Math.floor(window.innerWidth / 50); // Ajusta la cantidad según el ancho de la pantalla
    
    function crearNieve() {
        for (let i = 0; i < cantidadCopos; i++) {
            setTimeout(() => {
                const copo = document.createElement('div');
                copo.className = 'snowflake';
                copo.innerHTML = simbolos[Math.floor(Math.random() * simbolos.length)];
                copo.style.left = Math.random() * 100 + 'vw';
                copo.style.animationDuration = (Math.random() * 3 + 2) + 's';
                copo.style.opacity = Math.random();
                copo.style.fontSize = (Math.random() * 10 + 10) + 'px';
                
                document.querySelector('.snowfall').appendChild(copo);
                
                // Eliminar el copo después de que termine la animación
                setTimeout(() => {
                    if (copo && copo.parentNode) {
                        copo.remove();
                    }
                }, 5000);
            }, i * 300);
        }
    }

    // Iniciar el efecto de nieve y mantenerlo
    crearNieve();
    setInterval(crearNieve, 5000);
}

function animarCorazones() {
    const corazones = document.querySelectorAll('.floating-heart, .love-hearts');
    corazones.forEach(corazon => {
        corazon.style.animation = 'float 3s ease-in-out infinite';
    });
}

function mostrarMensajesSecuenciales() {
    const mensajes = document.querySelectorAll('.memory-card');
    mensajes.forEach((mensaje, index) => {
        setTimeout(() => {
            mensaje.style.opacity = '1';
            mensaje.style.transform = 'translateY(0)';
        }, index * 500);
    });
}

// Sistema de notificaciones mejorado
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span>${mensaje}</span>
            ${tipo === 'success' ? '💝' : '❤️'}
        </div>
    `;
    
    document.getElementById('notificaciones').appendChild(notificacion);
    
    // Efecto de entrada
    requestAnimationFrame(() => {
        notificacion.style.transform = 'translateX(0)';
        notificacion.style.opacity = '1';
    });
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            if (notificacion && notificacion.parentNode) {
                notificacion.remove();
            }
        }, 500);
    }, 3000);
}

// Cuenta regresiva para Navidad
function actualizarCuentaRegresiva() {
    const navidad = new Date('December 25, 2024 00:00:00').getTime();
    const ahora = new Date().getTime();
    const diferencia = navidad - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(dias).padStart(2, '0');
    document.getElementById('hours').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutos).padStart(2, '0');
    document.getElementById('seconds').textContent = String(segundos).padStart(2, '0');
}

// Mensajes secretos
function inicializarMensajesSecretos() {
    document.querySelectorAll('.secret-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                const mensaje = this.dataset.message;
                this.querySelector('.secret-back').textContent = mensaje;
                this.classList.add('revealed');
                mostrarNotificacion('💌 ¡Has descubierto un mensaje secreto!', 'success');
            }
        });
    });
}

// Función para manejar el botón de ingreso con Enter
function manejarTeclaEnter(evento) {
    if (evento.key === 'Enter') {
        verificarCodigo();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar música
    iniciarMusica();
    
    // Eventos para el login
    document.getElementById('loginBtn').addEventListener('click', verificarCodigo);
    document.getElementById('codeInput').addEventListener('keyup', manejarTeclaEnter);
    
    // Botón de sorpresa especial
    document.getElementById('showSurprise').addEventListener('click', () => {
        mostrarNotificacion('💝 ¡Abriendo tu sorpresa especial!', 'success');
        setTimeout(() => {
            window.open('sorpresa.html', '_blank');
        }, 1000);
    });

    // Inicializar cuenta regresiva
    setInterval(actualizarCuentaRegresiva, 1000);
    actualizarCuentaRegresiva();

    // Inicializar mensajes secretos
    inicializarMensajesSecretos();
});

// Service Worker para funcionamiento offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/christmas-service-worker.js')
            .then(registration => {
                console.log('ServiceWorker navideño registrado');
            })
            .catch(error => {
                console.log('Error al registrar ServiceWorker:', error);
            });
    });
}