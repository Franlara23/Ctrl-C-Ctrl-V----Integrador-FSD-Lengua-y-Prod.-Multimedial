// Cargar nombres de jugadores guardados
function cargarNombresJugadores() {
  const nombre1 = localStorage.getItem('nombreJugador1');
  const nombre2 = localStorage.getItem('nombreJugador2');
  
  const h2_1 = document.querySelector('h2.nombre-jugador[data-jugador="1"]');
  const h2_2 = document.querySelector('h2.nombre-jugador[data-jugador="2"]');
  
  if (nombre1 && h2_1) {
    h2_1.textContent = nombre1;
  }
  if (nombre2 && h2_2) {
    h2_2.textContent = nombre2;
  }
}

// Hacer editables los nombres de jugadores
function hacerEditablesNombres() {
  const nombresH2 = document.querySelectorAll('h2.nombre-jugador');
  
  nombresH2.forEach(h2 => {
    h2.style.cursor = 'pointer';
    h2.addEventListener('click', function() {
      const jugador = h2.getAttribute('data-jugador');
      const input = document.querySelector(`input.input-nombre[data-jugador="${jugador}"]`);
      
      if (input) {
        // Mostrar input y ocultar h2
        h2.style.display = 'none';
        input.style.display = 'block';
        input.value = h2.textContent;
        input.focus();
        input.select();
      }
    });
  });
  
  // Guardar cuando se pierda el foco o se presione Enter
  const inputs = document.querySelectorAll('input.input-nombre');
  inputs.forEach(input => {
    const guardarNombre = function() {
      const jugador = input.getAttribute('data-jugador');
      const nombreNuevo = input.value.trim() || `JUGADOR ${jugador}`;
      const h2 = document.querySelector(`h2.nombre-jugador[data-jugador="${jugador}"]`);
      
      // Guardar en localStorage
      localStorage.setItem(`nombreJugador${jugador}`, nombreNuevo);
      
      // Actualizar pantalla
      h2.textContent = nombreNuevo;
      h2.style.display = 'block';
      input.style.display = 'none';
    };
    
    input.addEventListener('blur', guardarNombre);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        guardarNombre();
      }
    });
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  cargarNombresJugadores();
  hacerEditablesNombres();
});
