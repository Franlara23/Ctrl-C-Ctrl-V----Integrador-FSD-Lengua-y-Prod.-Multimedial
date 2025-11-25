// --- CONFIGURACIÓN ---
const URL_RECETAS_J1 = 'jugador1.html';
const URL_RECETAS_J2 = 'jugador2.html';
const URL_FINAL = 'fin.html'; // ← Página de fin del juego
const MAX_RECETAS = 10;

const PUNTAJES = {
  proteinas: 3,
  carbohidrato: 2,
  frutas: 2,
  verdura: 1,
  condimento: 1
};

// --- VARIABLES GLOBALES ---
let tiempoRestante = 30;
let intervalo;
let jugadorActual = 1;
let puntosJugador1 = 0;
let puntosJugador2 = 0;

// --- FUNCIONES AUXILIARES ---
function q(s) { return document.querySelector(s); }

// --- TEMPORIZADOR Y JUGADORES ---
function actualizarTiempo() {
  const el = q('.header .header-item:nth-child(2)');
  if (el) el.textContent = String(tiempoRestante);
}

function cargarJugadorActual() {
  const j = localStorage.getItem('jugadorActual');
  jugadorActual = j ? parseInt(j,10) : 1;
  localStorage.setItem('jugadorActual', String(jugadorActual));
  const el = q('.header .header-item.jugador');
  if (el) el.textContent = `JUGADOR ${jugadorActual}`;
}

function setReceta(n) {
  localStorage.setItem('recetaActual', String(n));
  const el = q('.header .header-item:nth-child(3)');
  if (el) el.textContent = `Receta ${n}`;
}

function cargarNumeroReceta() {
  const n = parseInt(localStorage.getItem('recetaActual') || '1', 10);
  setReceta(n);
}

function cambiarJugador() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  localStorage.setItem('jugadorActual', String(jugadorActual));
  const el = q('.header .header-item.jugador');
  if (el) el.textContent = `JUGADOR ${jugadorActual}`;
}

function iniciarTemporizador() {
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    tiempoRestante--;
    actualizarTiempo();
    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      tiempoRestante = 0;
      actualizarTiempo();

      let recetaActual = parseInt(localStorage.getItem('recetaActual') || '1', 10);

      // Si ya se jugaron todas las recetas
      if (recetaActual >= MAX_RECETAS && jugadorActual === 2) {
        finalizarJuego();
        return;
      }

      cambiarJugador();
      localStorage.removeItem('startTimer');

      // Si ya terminó el turno del jugador 1, vuelve al HTML del jugador 2
      location.href = jugadorActual === 1 ? URL_RECETAS_J1 : URL_RECETAS_J2;
    }
  }, 1000);
}

function siguienteRecetaTurno() {
  let n = parseInt(localStorage.getItem('recetaActual') || '1', 10);
  n = n >= MAX_RECETAS ? 1 : n + 1;
  setReceta(n);
}

// --- PUNTAJES ---
function guardarPuntos() {
  localStorage.setItem('puntosJugador1', puntosJugador1);
  localStorage.setItem('puntosJugador2', puntosJugador2);
}

function cargarPuntos() {
  puntosJugador1 = parseInt(localStorage.getItem('puntosJugador1')) || 0;
  puntosJugador2 = parseInt(localStorage.getItem('puntosJugador2')) || 0;
}

function sumarPuntos(categoria) {
  const puntos = PUNTAJES[categoria] || 0;

  if (jugadorActual === 1) {
    puntosJugador1 += puntos;
  } else {
    puntosJugador2 += puntos;
  }

  guardarPuntos();

  console.log(`Jugador ${jugadorActual} ganó ${puntos} puntos (${categoria})`);
  console.log(`Total: J1=${puntosJugador1} | J2=${puntosJugador2}`);

  const header = document.querySelector('.jugador');
  if (header) {
    header.style.scale = '1.1';
    header.style.color = '#ffd93d';
    setTimeout(() => {
      header.style.scale = '1';
      header.style.color = '#fff';
    }, 300);
  }
}

function activarCartas() {
  const columnas = document.querySelectorAll('.columna-cartas');
  const categorias = ['carbohidrato', 'verdura', 'proteinas', 'frutas', 'condimento'];

  columnas.forEach((columna, index) => {
    const categoria = categorias[index];
    const cartas = columna.querySelectorAll('.carta-slot');

    cartas.forEach(carta => {
      carta.addEventListener('click', () => {
        sumarPuntos(categoria);
      });
    });
  });
}

// --- FINAL DEL JUEGO ---
function finalizarJuego() {
  localStorage.setItem('finJuego', '1');
  location.href = URL_FINAL;
}

// --- INICIO ---
window.addEventListener('DOMContentLoaded', () => {
  cargarJugadorActual();
  cargarNumeroReceta();
  actualizarTiempo();
  cargarPuntos();
  activarCartas();

  const shouldStart = localStorage.getItem('startTimer') === '1';
  if (shouldStart) {
    tiempoRestante = 30;
    actualizarTiempo();
    iniciarTemporizador();
    localStorage.removeItem('startTimer');
  }

  const btn = q('.header .btn-siguiente');
  if (btn) btn.addEventListener('click', siguienteRecetaTurno);
});
