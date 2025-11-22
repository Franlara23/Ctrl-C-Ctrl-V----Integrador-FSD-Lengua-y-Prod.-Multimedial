// Función para reiniciar el juego
function reiniciarJuego() {
  // Limpiar nombres de recetas guardados para cada jugador
  for (let i = 1; i <= 10; i++) {
    localStorage.removeItem(`receta_nombre_j1_${i}`);
    localStorage.removeItem(`receta_nombre_j2_${i}`);
    // Limpiar cartas seleccionadas por receta
    localStorage.removeItem(`cartas_seleccionadas_j1_${i}`);
    localStorage.removeItem(`cartas_seleccionadas_j2_${i}`);
  }
  // Limpiar otros datos del juego
  localStorage.removeItem('jugadorActual');
  localStorage.removeItem('recetaActual');
  localStorage.removeItem('puntosJugador1');
  localStorage.removeItem('puntosJugador2');
  localStorage.removeItem('startTimer');
  localStorage.removeItem('finJuego');
  // NO limpiar los nombres de jugadores - se mantienen entre partidas
}

// Manejar la intro de video
function manejarIntroVideo() {
  const introContainer = document.getElementById('intro-video-container');
  const introVideo = document.getElementById('intro-video');
  const skipBtn = document.getElementById('skip-intro-btn');

  // Mostrar la intro siempre (sin verificar localStorage por ahora)
  if (introVideo && skipBtn && introContainer) {
    // Función para ocultar la intro y marcar como vista
    const ocultarIntro = () => {
      introContainer.classList.add('hidden');
      localStorage.setItem('intro_vista', 'true');
      introVideo.pause();
    };

    // Asegurar que el contenedor sea visible al inicio
    introContainer.classList.remove('hidden');

    // Cuando el video termine, ocultarlo
    introVideo.addEventListener('ended', ocultarIntro);

    // Click en el botón de saltar
    skipBtn.addEventListener('click', ocultarIntro);

    // Opción: Permitir saltar el video al hacer clic en la pantalla (excepto el botón)
    introContainer.addEventListener('click', (e) => {
      if (e.target === introContainer) {
        ocultarIntro();
      }
    });

    // Permitir saltar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !introContainer.classList.contains('hidden')) {
        ocultarIntro();
      }
    });

    // Intentar reproducir el video
    setTimeout(() => {
      const promisePlay = introVideo.play();
      if (promisePlay !== undefined) {
        promisePlay.catch(error => {
          console.log('Error al reproducir video:', error);
        });
      }
    }, 100);
  }
}

// Inicializar evento al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Manejar la intro de video
  manejarIntroVideo();

  // Agregar evento al botón de jugar
  const btnJugar = document.querySelector('.btn.jugar');
  if (btnJugar) {
    btnJugar.addEventListener('click', reiniciarJuego);
  }
});

