let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ANCHO_GATO=130;
const ALTO_GATO=130;
const ANCHO_COMIDA=70;
const ALTO_COMIDA=40;

let gatoX=(canvas.width/2)-(ANCHO_GATO/2);
let gatoY=(canvas.height/2)-(ALTO_GATO/2);
let comidaX=canvas.width-ANCHO_COMIDA;
let comidaY=canvas.height-ALTO_COMIDA;

let tiempo=25;
let puntos=0;

function graficarGato(){
    graficarRectangulo(gatoX,gatoY,ANCHO_GATO,ALTO_GATO,"#391006");
}

function graficarComida(){
    graficarRectangulo(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA,"#27b83f");
}

function iniciarJuego(){
    graficarGato();
    graficarComida();

    identificadorTiempo = setInterval(restarTiempo, 1000);
}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ancho,alto);
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function moverIzquierda(){
    gatoX=gatoX-15;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverDerecha(){
    gatoX=gatoX+15;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverArriba(){
    gatoY=gatoY-15;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverAbajo(){
    gatoY=gatoY+15;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function detectarColision(){
    if(gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY){

        puntos=puntos+1;
        mostrarEnSpan("puntos", puntos);

         if(puntos==5){
            mostrarEnSpan("puntos", puntos);
            clearInterval(identificadorTiempo);
            setTimeout(function() {
            alert("Gracias, el gatito ha quedado satisfecho");
            reiniciarJuego();
            }, 100);
            return;
        }
            
        limpiarCanva();
        graficarGato();
        AleatorioGraficarComida(); 
    }
}

function AleatorioGraficarComida(){
    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
    graficarComida();
}

function restarTiempo(){
    tiempo=tiempo-1;
    mostrarEnSpan("tiempo",tiempo);
    if(tiempo==0){
            alert("¡Game Over!, el tiempo se agotó");
            clearInterval(identificadorTiempo);
            reiniciarJuego();
            return;
        }
}

function reiniciarJuego(){
    clearInterval(identificadorTiempo);
    puntos = 0;
    tiempo = 25;
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;
    mostrarEnSpan("puntos", puntos);
    mostrarEnSpan("tiempo", tiempo);
    limpiarCanva();
    graficarGato();
    graficarComida();
    identificadorTiempo = setInterval(restarTiempo, 1000);
}