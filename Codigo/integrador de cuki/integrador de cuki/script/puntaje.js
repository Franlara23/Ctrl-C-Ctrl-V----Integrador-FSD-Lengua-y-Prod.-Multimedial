document.addEventListener('DOMContentLoaded', () => {
  const j1 = document.getElementById('puntosJ1');
  const j2 = document.getElementById('puntosJ2');

  function get(name) {
    return parseInt(localStorage.getItem(name)) || 0;
  }

  function render() {
    if (j1) j1.textContent = get('puntosJugador1');
    if (j2) j2.textContent = get('puntosJugador2');
  }

  // Actualiza automáticamente si cambian los valores
  window.addEventListener('storage', (e) => {
    if (e.key === 'puntosJugador1' || e.key === 'puntosJugador2') {
      render();
    }
  });

  render();
});
