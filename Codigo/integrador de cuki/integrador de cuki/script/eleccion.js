// --- CONFIGURACIÓN ---
const URL_RECETAS_J1 = 'jugador1.html';
const URL_RECETAS_J2 = 'jugador2.html';
const URL_FINAL = 'fin.html';
const MAX_RECETAS = 10;
const MAX_SELECCIONES_POR_CARTA = 3;

const PUNTAJES = {
  proteinas: 3,
  carbohidrato: 2,
  frutas: 2,
  verdura: 1,
  condimento: 1
};

// Mapeo de imágenes para cada alimento
const IMAGENES = {
  'Mango': '../Assets/img/mango.svg',
  'Avena': '../Assets/img/avena.svg',
  'Arroz': '../Assets/img/arroz.svg',
  'Fideos': '../Assets/img/fideos.svg',
  'Cereal': '../Assets/img/cereal.svg',
  'Cous Cous': '../Assets/img/cous cous.svg',
  'Maiz': '../Assets/img/maiz.svg',
  'Miel': '../Assets/img/miel.svg',
  'Pan': '../Assets/img/pan.svg',
  'Polenta': '../Assets/img/polenta.svg',
  'Quinoa': '../Assets/img/quinoa.svg',
  'Tortillas': '../Assets/img/tortillas.svg',
  'Ñoquis': '../Assets/img/ñoquis.svg',
  'Apio': '../Assets/img/apio (2).svg',
  'Berenjena': '../Assets/img/berenjena.svg',
  'Brocoli': '../Assets/img/brocoli (2).svg',
  'Calabaza': '../Assets/img/calabaza.svg',
  'Cebolla': '../Assets/img/cebolla (2).svg',
  'Espinaca': '../Assets/img/espinaca.svg',
  'Hongo': '../Assets/img/hongos.svg',
  'Lechuga': '../Assets/img/lechuga.svg',
  'Lentejas': '../Assets/img/lentejas.svg',
  'Pimiento': '../Assets/img/pimiento.svg',
  'Zanahoria': '../Assets/img/zanahoria.svg',
  'Pepina': '../Assets/img/pepino (2).svg',
  'Atun': '../Assets/img/atun.svg',
  'Camaron': '../Assets/img/camaron.svg',
  'Carne': '../Assets/img/carne.svg',
  'Cerdo': '../Assets/img/cerdo.svg',
  'Garbanzos': '../Assets/img/garbanzo (2).svg',
  'Huevo': '../Assets/img/huevo.svg',
  'Jamon': '../Assets/img/jamon.svg',
  'Pescado': '../Assets/img/pescado.svg',
  'Pollo': '../Assets/img/pollo.svg',
  'Queso': '../Assets/img/queso.svg',
  'Tofu': '../Assets/img/tofu.svg',
  'Anana': '../Assets/img/anana (2).svg',
  'Banana': '../Assets/img/banana.svg',
  'Ciruela': '../Assets/img/ciruela (2).svg',
  'Durazno': '../Assets/img/durazno (2).svg',
  'Frutilla': '../Assets/img/frutilla (2).svg',
  'Kiwi': '../Assets/img/kiwi.svg',
  'Manzana': '../Assets/img/manzana.svg',
  'Pomelo': '../Assets/img/pomelo.svg',
  'Uvas': '../Assets/img/uvas.svg',
  'Naranja': '../Assets/img/naranja.svg',
  'Pera': '../Assets/img/pera (2).svg',
  'Aceite de Oliva': '../Assets/img/aceite de oliva.svg',
  'Ajo en polvo': '../Assets/img/ajo en polvo.svg',
  'Comino': '../Assets/img/comino (2).svg',
  'Ketchup': '../Assets/img/ketchup.svg',
  'Mostaza': '../Assets/img/mostaza.svg',
  'Oregano': '../Assets/img/oregano.svg',
  'Salsa de Soja': '../Assets/img/salsa de soja.svg',
  'Vinagre': '../Assets/img/vinagre.svg',
  'Mayonesa': '../Assets/img/mayonesa.svg',
  'Perejil': '../Assets/img/perejil.svg',
  'Pimienta': '../Assets/img/pimienta.svg',
  'Sal': '../Assets/img/sal.svg'
};

// --- VARIABLES GLOBALES ---
let tiempoRestante = 30;
let intervalo;
let jugadorActual = 1;
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let cartasSeleccionadas = {}; // { alimento: cantidad }

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
  if (el) {
    const nombreGuardado = localStorage.getItem(`nombreJugador${jugadorActual}`);
    el.textContent = nombreGuardado || `JUGADOR ${jugadorActual}`;
  }
}

function setReceta(n) {
  localStorage.setItem('recetaActual', String(n));
  const el = q('.receta-nombre-editable');
  if (el) {
    const nombreGuardado = localStorage.getItem(`receta_nombre_j${jugadorActual}_${n}`);
    el.textContent = nombreGuardado || `Receta ${n}`;
  }
  // Limpiar cartas seleccionadas al cambiar de receta
  cartasSeleccionadas = {};
  actualizarCartasDisplay();
  
  // Detener, reiniciar y reproducir los videos al cambiar de receta
  detenerVideos();
  setTimeout(() => {
    reproducirVideos();
  }, 100);
}

function cargarNumeroReceta() {
  const n = parseInt(localStorage.getItem('recetaActual') || '1', 10);
  setReceta(n);
}

// --- EDICIÓN DE NOMBRES DE RECETAS ---
function hacerEditableRecetaNombre() {
  const recetaNombreEl = document.querySelector('.receta-nombre-editable');
  if (!recetaNombreEl) return;
  
  recetaNombreEl.contentEditable = 'true';
  recetaNombreEl.style.cursor = 'text';
  recetaNombreEl.title = 'Haz clic para editar el nombre de la receta';
  
  recetaNombreEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      recetaNombreEl.blur();
    }
  });
  
  recetaNombreEl.addEventListener('blur', function() {
    const recetaNum = parseInt(localStorage.getItem('recetaActual') || '1', 10);
    const nombre = recetaNombreEl.textContent || `Receta ${recetaNum}`;
    localStorage.setItem(`receta_nombre_j${jugadorActual}_${recetaNum}`, nombre);
    recetaNombreEl.textContent = nombre;
  });
}

// --- GESTIÓN DE CARTAS ---
function actualizarCartasDisplay() {
  const display = document.getElementById('cartasDisplay');
  if (!display) return;
  
  display.innerHTML = '';
  
  // Agrupar por categoría en el orden: carbohidrato, verdura, proteinas, frutas, condimento
  const ordenes = {
    carbohidrato: 0,
    verdura: 1,
    proteinas: 2,
    frutas: 3,
    condimento: 4
  };
  
  const cartasOrdenadas = Object.entries(cartasSeleccionadas)
    .filter(([_, cantidad]) => cantidad > 0)
    .sort((a, b) => {
      // Necesitamos obtener la categoría de cada alimento
      const cartaA = document.querySelector(`[data-alimento="${a[0]}"]`);
      const cartaB = document.querySelector(`[data-alimento="${b[0]}"]`);
      const catA = cartaA ? cartaA.getAttribute('data-categoria') : '';
      const catB = cartaB ? cartaB.getAttribute('data-categoria') : '';
      return (ordenes[catA] || 999) - (ordenes[catB] || 999);
    });
  
  cartasOrdenadas.forEach(([alimento, cantidad]) => {
    const carta = document.querySelector(`[data-alimento="${alimento}"]`);
    if (!carta) return;
    
    const categoria = carta.getAttribute('data-categoria');
    const imagen = IMAGENES[alimento];
    
    const cartaElement = document.createElement('div');
    cartaElement.className = 'carta-seleccionada';
    cartaElement.style.backgroundColor = obtenerColorCategoria(categoria);
    cartaElement.style.backgroundImage = `url(${imagen})`;
    cartaElement.style.backgroundSize = 'contain';
    cartaElement.style.backgroundRepeat = 'no-repeat';
    cartaElement.style.backgroundPosition = 'center';
    
    cartaElement.innerHTML = `<span class="cantidad">${cantidad}</span>`;
    
    display.appendChild(cartaElement);
  });
}

function obtenerColorCategoria(categoria) {
  const colores = {
    carbohidrato: '#FFA500',
    verdura: '#2DB84D',
    proteinas: '#E63946',
    frutas: '#4B0082',
    condimento: '#FFD700'
  };
  return colores[categoria] || '#ccc';
}

function activarCartas() {
  const cartas = document.querySelectorAll('.carta-slot');
  
  cartas.forEach(carta => {
    carta.style.cursor = 'pointer';
    carta.addEventListener('click', function(e) {
      e.stopPropagation();
      const alimento = carta.getAttribute('data-alimento');
      const categoria = carta.getAttribute('data-categoria');
      const videoBrillo = carta.getAttribute('data-video-brillo');
      
      // Contar cuántos ingredientes de esta categoría ya se seleccionaron EN ESTA RECETA
      let conteoCategoria = 0;
      Object.entries(cartasSeleccionadas).forEach(([ali, cant]) => {
        const cartaExistente = document.querySelector(`[data-alimento="${ali}"]`);
        if (cartaExistente && cartaExistente.getAttribute('data-categoria') === categoria) {
          conteoCategoria += cant;
        }
      });
      
      // Contar cuántas veces se ha usado este ingrediente en TODAS las recetas
      let conteoAlimentoGlobal = 0;
      for (let i = 1; i <= 10; i++) {
        const key = `cartas_seleccionadas_j${jugadorActual}_${i}`;
        const cartasJSON = localStorage.getItem(key);
        if (cartasJSON) {
          const cartas = JSON.parse(cartasJSON);
          if (cartas[alimento]) {
            conteoAlimentoGlobal += cartas[alimento];
          }
        }
      }
      
      // Solo permitir si:
      // 1. No hay 1 o más de esta categoría EN ESTA RECETA
      // 2. El ingrediente no se ha usado 3 veces ya EN TOTAL
      if (conteoCategoria === 0 && conteoAlimentoGlobal < 3) {
        cartasSeleccionadas[alimento] = 1;
        sumarPuntos(categoria);
        
        // Efecto visual de selección
        carta.classList.add('seleccionada');
        setTimeout(() => {
          carta.classList.remove('seleccionada');
        }, 200);
        
        // Reproducir video de brillo si existe
        if (videoBrillo) {
          reproducirVideoBrillo(videoBrillo, carta, alimento);
        }
        
        // Actualizar la visualización
        actualizarCartasDisplay();
      }
    });
  });
}

// --- MANEJO DE VIDEOS ---
function reproducirVideoBrillo(src, cartaElement, alimento) {
  // Obtener el video de rotación de la carta
  const videoRotacion = cartaElement.querySelector('.carta-video');
  
  if (videoRotacion) {
    // Guardar el src original del video de rotación
    const srcRotacionOriginal = videoRotacion.getAttribute('src');
    
    // Cambiar temporalmente el source del video a la versión de brillo
    videoRotacion.src = src;
    videoRotacion.currentTime = 0;
    videoRotacion.style.display = 'block';
    videoRotacion.play().catch(err => {
      console.log('Error al reproducir video de brillo:', err);
    });
    
    // Cuando termina el video de brillo, mostrar la imagen
    const onEnded = () => {
      // Ocultar el video y mostrar la imagen
      videoRotacion.style.display = 'none';
      
      const imagen = IMAGENES[alimento];
      if (imagen) {
        const cartaPlaceholder = cartaElement.querySelector('.carta-placeholder');
        if (cartaPlaceholder) {
          cartaPlaceholder.style.backgroundImage = `url(${imagen})`;
          cartaPlaceholder.classList.remove('mostrar-imagen');
          // Trigger reflow para que la animación se reproduzca
          void cartaPlaceholder.offsetWidth;
          cartaPlaceholder.classList.add('mostrar-imagen');
        }
      }
      
      // Restaurar el video de rotación original pero mantenerlo oculto
      videoRotacion.src = srcRotacionOriginal;
      videoRotacion.currentTime = 0;
      
      videoRotacion.removeEventListener('ended', onEnded);
    };
    
    videoRotacion.addEventListener('ended', onEnded);
  }
}

function reproducirVideos() {
  const videos = document.querySelectorAll('.carta-video');
  videos.forEach(video => {
    video.play().catch(err => {
      console.log('Autoplay bloqueado o error al reproducir video:', err);
    });
  });
}

function detenerVideos() {
  const videos = document.querySelectorAll('.carta-video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

function cambiarJugador() {
  jugadorActual = jugadorActual === 1 ? 2 : 1;
  localStorage.setItem('jugadorActual', String(jugadorActual));
  const el = q('.header .header-item.jugador');
  if (el) el.textContent = `JUGADOR ${jugadorActual}`;
}

function iniciarTemporizador() {
  clearInterval(intervalo);
  
  // Reproducir los videos cuando inicia el turno
  reproducirVideos();
  
  intervalo = setInterval(() => {
    tiempoRestante--;
    actualizarTiempo();
    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      tiempoRestante = 0;
      actualizarTiempo();
      
      // Detener y pausar los videos
      detenerVideos();

      // Guardar cartas antes de cambiar de jugador
      guardarCartasSeleccionadas();

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

function guardarCartasSeleccionadas() {
  const recetaNum = parseInt(localStorage.getItem('recetaActual') || '1', 10);
  const key = `cartas_seleccionadas_j${jugadorActual}_${recetaNum}`;
  localStorage.setItem(key, JSON.stringify(cartasSeleccionadas));
}

function siguienteRecetaTurno() {
  guardarCartasSeleccionadas();
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
  hacerEditableRecetaNombre();

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
