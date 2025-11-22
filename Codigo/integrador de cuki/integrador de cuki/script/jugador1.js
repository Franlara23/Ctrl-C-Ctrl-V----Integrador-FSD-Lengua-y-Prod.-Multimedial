// Configuración
const URL_ELECCION = 'eleccion.html';

// Datos de alimentos con sus imágenes y categorías
const ALIMENTOS = {
  'Avena': { src: '../Assets/img/avena.svg', categoria: 'carbohidrato' },
  'Arroz': { src: '../Assets/img/arroz.svg', categoria: 'carbohidrato' },
  'Fideos': { src: '../Assets/img/fideos.svg', categoria: 'carbohidrato' },
  'Cereal': { src: '../Assets/img/cereal.svg', categoria: 'carbohidrato' },
  'Cous Cous': { src: '../Assets/img/cous cous.svg', categoria: 'carbohidrato' },
  'Maiz': { src: '../Assets/img/maiz.svg', categoria: 'carbohidrato' },
  'Miel': { src: '../Assets/img/miel.svg', categoria: 'carbohidrato' },
  'Pan': { src: '../Assets/img/pan.svg', categoria: 'carbohidrato' },
  'Polenta': { src: '../Assets/img/polenta.svg', categoria: 'carbohidrato' },
  'Quinoa': { src: '../Assets/img/quinoa.svg', categoria: 'carbohidrato' },
  'Tortillas': { src: '../Assets/img/tortillas.svg', categoria: 'carbohidrato' },
  'Ñoquis': { src: '../Assets/img/ñoquis.svg', categoria: 'carbohidrato' },
  'Apio': { src: '../Assets/img/apio (2).svg', categoria: 'verdura' },
  'Berenjena': { src: '../Assets/img/berenjena.svg', categoria: 'verdura' },
  'Brocoli': { src: '../Assets/img/brocoli (2).svg', categoria: 'verdura' },
  'Calabaza': { src: '../Assets/img/calabaza.svg', categoria: 'verdura' },
  'Cebolla': { src: '../Assets/img/cebolla (2).svg', categoria: 'verdura' },
  'Espinaca': { src: '../Assets/img/espinaca.svg', categoria: 'verdura' },
  'Hongo': { src: '../Assets/img/hongos.svg', categoria: 'verdura' },
  'Lechuga': { src: '../Assets/img/lechuga.svg', categoria: 'verdura' },
  'Lentejas': { src: '../Assets/img/lentejas.svg', categoria: 'verdura' },
  'Pimiento': { src: '../Assets/img/pimiento.svg', categoria: 'verdura' },
  'Zanahoria': { src: '../Assets/img/zanahoria.svg', categoria: 'verdura' },
  'Pepina': { src: '../Assets/img/pepino (2).svg', categoria: 'verdura' },
  'Atun': { src: '../Assets/img/atun.svg', categoria: 'proteinas' },
  'Camaron': { src: '../Assets/img/camaron.svg', categoria: 'proteinas' },
  'Carne': { src: '../Assets/img/carne.svg', categoria: 'proteinas' },
  'Cerdo': { src: '../Assets/img/cerdo.svg', categoria: 'proteinas' },
  'Garbanzos': { src: '../Assets/img/garbanzo (2).svg', categoria: 'proteinas' },
  'Huevo': { src: '../Assets/img/huevo.svg', categoria: 'proteinas' },
  'Jamon': { src: '../Assets/img/jamon.svg', categoria: 'proteinas' },
  'Pescado': { src: '../Assets/img/pescado.svg', categoria: 'proteinas' },
  'Pollo': { src: '../Assets/img/pollo.svg', categoria: 'proteinas' },
  'Queso': { src: '../Assets/img/queso.svg', categoria: 'proteinas' },
  'Tofu': { src: '../Assets/img/tofu.svg', categoria: 'proteinas' },
  'Anana': { src: '../Assets/img/anana (2).svg', categoria: 'frutas' },
  'Banana': { src: '../Assets/img/banana.svg', categoria: 'frutas' },
  'Ciruela': { src: '../Assets/img/ciruela (2).svg', categoria: 'frutas' },
  'Durazno': { src: '../Assets/img/durazno (2).svg', categoria: 'frutas' },
  'Frutilla': { src: '../Assets/img/frutilla (2).svg', categoria: 'frutas' },
  'Kiwi': { src: '../Assets/img/kiwi.svg', categoria: 'frutas' },
  'Manzana': { src: '../Assets/img/manzana.svg', categoria: 'frutas' },
  'Pomelo': { src: '../Assets/img/pomelo.svg', categoria: 'frutas' },
  'Uvas': { src: '../Assets/img/uvas.svg', categoria: 'frutas' },
  'Naranja': { src: '../Assets/img/naranja.svg', categoria: 'frutas' },
  'Pera': { src: '../Assets/img/pera (2).svg', categoria: 'frutas' },
  'Aceite de Oliva': { src: '../Assets/img/aceite de oliva.svg', categoria: 'condimento' },
  'Ajo en polvo': { src: '../Assets/img/ajo en polvo.svg', categoria: 'condimento' },
  'Comino': { src: '../Assets/img/comino (2).svg', categoria: 'condimento' },
  'Ketchup': { src: '../Assets/img/ketchup.svg', categoria: 'condimento' },
  'Mostaza': { src: '../Assets/img/mostaza.svg', categoria: 'condimento' },
  'Oregano': { src: '../Assets/img/oregano.svg', categoria: 'condimento' },
  'Salsa de Soja': { src: '../Assets/img/salsa de soja.svg', categoria: 'condimento' },
  'Vinagre': { src: '../Assets/img/vinagre.svg', categoria: 'condimento' },
  'Mayonesa': { src: '../Assets/img/mayonesa.svg', categoria: 'condimento' },
  'Perejil': { src: '../Assets/img/perejil.svg', categoria: 'condimento' },
  'Pimienta': { src: '../Assets/img/pimienta.svg', categoria: 'condimento' },
  'Sal': { src: '../Assets/img/sal.svg', categoria: 'condimento' }
};

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

// Cargar y mostrar cartas seleccionadas por receta
function cargarCartasSeleccionadas() {
  const contenedores = document.querySelectorAll('.contenedor-cartas');
  
  contenedores.forEach(contenedor => {
    const recetaNum = parseInt(contenedor.getAttribute('data-receta'), 10);
    const key = `cartas_seleccionadas_j1_${recetaNum}`;
    const cartasJSON = localStorage.getItem(key);
    
    if (cartasJSON) {
      const cartas = JSON.parse(cartasJSON);
      
      // Limpiar contenedor
      contenedor.innerHTML = '';
      
      // Mostrar cada carta seleccionada
      Object.entries(cartas).forEach(([alimento, cantidad]) => {
        if (cantidad > 0 && ALIMENTOS[alimento]) {
          const info = ALIMENTOS[alimento];
          const cartaElement = document.createElement('div');
          cartaElement.className = 'carta-mini';
          cartaElement.style.backgroundColor = obtenerColorCategoria(info.categoria);
          
          cartaElement.innerHTML = `
            <img src="${info.src}" alt="${alimento}">
            <span class="cantidad-mini">${cantidad}</span>
          `;
          
          contenedor.appendChild(cartaElement);
        }
      });
    }
  });
}

// Hacer editables los botones de receta
function hacerEditablesRecetas() {
  const botones = document.querySelectorAll('.receta-btn');
  
  botones.forEach(btn => {
    const recetaNum = parseInt(btn.getAttribute('data-receta'), 10);
    
    // Cargar nombre guardado desde localStorage
    const nombreGuardado = localStorage.getItem(`receta_nombre_j1_${recetaNum}`);
    if (nombreGuardado) {
      btn.textContent = nombreGuardado;
    }
    
    btn.contentEditable = 'true';
    btn.style.cursor = 'text';
    btn.title = 'Haz clic para editar el nombre de la receta';
    
    // Evitar que se ejecute la función onclick al presionar Enter
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        btn.blur();
      }
    });
    
    // Guardar el nombre cuando se pierda el foco
    btn.addEventListener('blur', function() {
      const nombreNuevo = btn.textContent || `Receta ${recetaNum}`;
      localStorage.setItem(`receta_nombre_j1_${recetaNum}`, nombreNuevo);
    });
    
    // Detectar click en el botón (solo si no está editando)
    btn.addEventListener('click', function(e) {
      // Si tiene selección de texto, es porque está editando
      const selection = window.getSelection().toString();
      if (!selection) {
        seleccionarReceta(recetaNum);
      }
    });
  });
}

// Función para seleccionar receta
function seleccionarReceta(numeroReceta) {
  localStorage.setItem('recetaActual', String(numeroReceta));
  localStorage.setItem('startTimer', '1');
  location.href = URL_ELECCION;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('jugadorActual', '1');
  const t = document.querySelector('.jugador-titulo');
  if (t) {
    const nombreGuardado = localStorage.getItem('nombreJugador1');
    t.textContent = nombreGuardado || 'Jugador 1';
  }
  
  hacerEditablesRecetas();
  cargarCartasSeleccionadas();
});
