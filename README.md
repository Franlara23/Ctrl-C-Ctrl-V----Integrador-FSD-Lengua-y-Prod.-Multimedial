# 👨‍🍳 CUKI - Trading Card Game (TCG) 

**Cuki** es un juego de cartas donde dos jugadores compiten como chefs. El objetivo es simple: sumar más puntos que el rival eligiendo ingredientes y armando recetas bajo presión.

## 🎮 Descripción y Reglas

La partida se juega en **10 turnos de 30 segundos**. En cada turno, los jugadores seleccionan ingredientes (uno por categoria en cada receta) para construir sus platos y acumular puntos.

### Dinámica de Juego
El desafío combina velocidad, memoria y estrategia. Aunque el puntaje final depende del valor de las cartas, el concepto invita a recordar combinaciones y tomar decisiones rápidas para convertirse en el **Chef Supremo Cuki**.

### 🏆 Sistema de Puntuación
Cada carta otorga puntos según su categoría:

| Categoría | Puntos |
|-----------|:------:|
| **Proteínas** | **3** |
| **Carbohidratos** | **2** |
| **Frutas** | **2** |
| **Verduras** | **1** |
| **Condimentos** | **1** |

---

## 📅 Bitácora de Desarrollo: Historia de los Sprints

El proyecto evolucionó desde un sistema más complejo hacia una experiencia más clara y rápida.

### 🔹 Sprints 1-4: Concepción y Mecánicas Base

En esta etapa se definieron las primeras mecánicas del juego:

* **Recetas Oficiales:** combinaciones exactas como Sándwich u Omelette.  
* **Bonus +5:** si un jugador lograba una receta oficial perfecta, recibía puntos extra además del valor de las cartas.  
* **Lógica Base:** se creó la estructura inicial en JavaScript y el uso de `localStorage` para mantener datos entre pantallas.  
* **Sistema de turnos:** se diseñó el flujo general del TCG y la estructura de ingredientes.

### 🔹 Sprint 5: Playtesting, Rediseño Completo y Cambio de Lógica

Al probar el juego con usuarios reales se detectaron problemas importantes:

* Las pantallas originales eran confusas.
* La navegación no acompañaba el ritmo rápido del juego.
* Y algo clave: **la mecánica de bonus hacía que el juego cargara las 60 cartas completas**, lo que hacía la carga muy pesada y complicaba muchísimo la jugabilidad.

**Decisión:** rehacer las pantallas y reescribir gran parte del código.  
En esta reestructuración se tomó una medida fundamental:  
👉 **Se eliminó la mecánica de bonus y recetas oficiales**, ya que cargar todas las cartas en cada turno generaba demoras, sobrecarga visual y una experiencia mucho menos fluida.  

Se reorganizó la lógica en archivos modulares (`eleccion.js`, `jugador1.js`, `jugador2.js`) y se simplificó la interfaz para priorizar la velocidad del juego.

### 🔹 Sprint 6: Integración Visual y Optimización

El enfoque final estuvo en el arte y los recursos multimedia:

* Se integraron ilustraciones SVG para cada alimento.
* Se añadieron videos de introducción y efectos visuales.
* Se creó el script `organizar_videos.ps1` para ordenar automáticamente los videos en carpetas según categoría.

---

## 📁 Estructura de Archivos

- **`/Scripts`**: Lógica del juego (turnos, puntaje, selección, persistencia).
- **`/Pages`**: HTML de cada pantalla (configuración, tableros, puntaje, reglas).
- **`/Assets`**: Gráficos, ilustraciones y videos + script de organización.

---
## 🎨 Licencias y Assets

La identidad visual de **Cuki** fue consolidada entre los **Sprints 5 y 6**, donde se sustituyeron los placeholders por arte final y se implementó una gestión de archivos automatizada.

* **Ilustraciones Vectoriales:** Se utilizan archivos `.svg` de alta fidelidad para la representación de todos los ingredientes (Avellana, Pollo, Verduras, etc.), optimizando el rendimiento de carga y la nitidez en distintos dispositivos.
* **Contenido Multimedia:** Se integraron videos en formato `.mp4` para la narrativa del juego, incluyendo un `Animatic_Intro.mp4` en la pantalla de inicio y efectos visuales dinámicos (brillos) sobre las cartas.
* **Gestión Automatizada:** Debido al volumen de assets de video generados en las etapas finales, se desarrolló un script de utilidad en PowerShell (`organizar_videos.ps1`). Esta herramienta automatiza la clasificación de archivos de video moviéndolos a directorios específicos según su categoría (carbohidratos, proteinas, verduras, etc.), asegurando un entorno de desarrollo limpio.

> **Todos los derechos de las ilustraciones, código fuente y mecánicas de juego pertenecen al equipo de desarrollo de Cuki.**

## 📝 Notas de Versión

### v1.0.0 - Release Final (Sprint 6)
Versión estable y completa del juego, resultado de la refactorización post-testing.
* **Core Loop:** Implementación definitiva del temporizador de 30 segundos y lógica de turnos alternados entre Jugador 1 y Jugador 2.
* **Sistema de Puntajes:** Simplificación de la lógica de puntuación basada en valores fijos por categoría (Proteínas 3pts, Carbohidratos 2pts, etc.), eliminando las mecánicas complejas de "Bonus" de versiones anteriores para mejorar la fluidez.
* **Persistencia:** Sistema robusto de guardado de estado (nombres, puntajes, recetas editables) utilizando `localStorage`, permitiendo la continuidad entre las distintas pantallas HTML.
* **UI/UX:** Interfaz completamente rediseñada y adaptable (Responsive).

### v0.5.0 - Alpha (Sprint 5 - Deprecado)
* Versión prototipo utilizada durante las sesiones de Play Testing.
* Contenía la mecánica de "Recetas Oficiales" y bonificaciones de +5 puntos (descartada por complejidad innecesaria).
* Interfaz gráfica anterior (descartada por feedback negativo sobre usabilidad y navegación).
## 👥 Autores

---
Desarrollado como parte del proyecto final para **FDS, LENGUA Y PROD. MULT.**.
- **Equipo de Trabajo: GameDevelopers ICDC**
- **Frontend & Lógica: Benjamín Liseno**  
- **Diseño UI/UX: Joaquín Liseno** 
- **Arte & Assets: Francisco Lara y Juan Ignacio Fernandez**
- **Investigación & Documentación: Juan Cruz Fernandez**
- **Liderazgo de equipo: Francisco Lara**


---
Link presentación: https://www.canva.com/design/DAG505QK62w/EenaapaMEglgbqa283ySoQ/edit?utm_content=DAG505QK62w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton 
---
*¡Cociná tu estrategia y convertite en el Chef Supremo Cuki!* 👨‍🍳🔥
```
