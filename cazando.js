(function() {
  const canvas = document.getElementById("areaJuego");
  const ctx = canvas.getContext("2d");
  const spanPuntos = document.getElementById("puntos");
  const spanTiempo = document.getElementById("tiempo");

  const ANCHO_GATO = 130;
  const ALTO_GATO = 130;
  const ANCHO_COMIDA = 80;
  const ALTO_COMIDA = 60;

  let gatoX, gatoY, comidaX, comidaY;
  let puntos, tiempo;
  let identificadorTiempo = null;
  let tiempoDeRonda = 15;

  // --- CARGA DE IMÁGENES ---
  const imgGato = new Image();
  imgGato.src = "Gato_boca_abierta.png";

  const imgPescado = new Image();
  imgPescado.src = "Pescado.jpg";

  const imgFondo = new Image();
  imgFondo.src = "fondo.jpg";

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    ctx.drawImage(imgPescado, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
  }

  // Redibujar cuando carguen por primera vez
  imgGato.onload = dibujar;
  imgPescado.onload = dibujar;
  imgFondo.onload = dibujar;

  function moverIzquierda() { gatoX = Math.max(0, gatoX - 30); dibujar(); detectarColision(); }
  function moverDerecha() { gatoX = Math.min(canvas.width - ANCHO_GATO, gatoX + 30); dibujar(); detectarColision(); }
  function moverArriba() { gatoY = Math.max(0, gatoY - 30); dibujar(); detectarColision(); }
  function moverAbajo() { gatoY = Math.min(canvas.height - ALTO_GATO, gatoY + 30); dibujar(); detectarColision(); }

  function detectarColision() {
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
      
      puntos++;
      spanPuntos.textContent = puntos;

      tiempoDeRonda--; 
      tiempo = tiempoDeRonda; 
      spanTiempo.textContent = tiempo;
      
      if (puntos === 5) {
        clearInterval(identificadorTiempo); // Detiene el tiempo inmediatamente
        setTimeout(() => { 
          alert("¡Misión cumplida! El gato cenó pescado."); 
          reiniciarJuego(); 
        }, 100);
        return;
      }

      // Mover comida a posición aleatoria
      comidaX = Math.floor(Math.random() * (canvas.width - ANCHO_COMIDA));
      comidaY = Math.floor(Math.random() * (canvas.height - ALTO_COMIDA));
      dibujar();    
    }
  }
  

  function restarTiempo() {
    tiempo--;
    spanTiempo.textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(identificadorTiempo);
      alert("¡Game Over! Se acabó el tiempo.");
      tiempoDeRonda=15;
      reiniciarJuego();
    }
  }

  function reiniciarJuego() {
    // 1. Limpiar cualquier intervalo activo para que no corra doble
    if (identificadorTiempo) clearInterval(identificadorTiempo);

    // 2. Resetear valores lógicos
    puntos = 0;
    tiempo = tiempoDeRonda;

    // 3. Resetear visualmente los textos
    spanPuntos.textContent = puntos;
    spanTiempo.textContent = tiempo;

    // 4. Posiciones iniciales
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    comidaX = Math.floor(Math.random() * (canvas.width - ANCHO_COMIDA));
    comidaY = Math.floor(Math.random() * (canvas.height - ALTO_COMIDA));

    // 5. Dibujar y arrancar de nuevo
    dibujar();
    identificadorTiempo = setInterval(restarTiempo, 1000);
  }

  // Configuración de botones
  document.getElementById("btnIzquierda").onclick = moverIzquierda;
  document.getElementById("btnDerecha").onclick = moverDerecha;
  document.getElementById("btnArriba").onclick = moverArriba;
  document.getElementById("btnAbajo").onclick = moverAbajo;
  document.getElementById("btnReiniciar").onclick = reiniciarJuego;

  // Iniciar por primera vez
  reiniciarJuego();
})();