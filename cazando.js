let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ANCHO_GATO=200;
const ALTO_GATO=90;
const ANCHO_COMIDA=20;
const ALTO_COMIDA=20;

let gatoX=(canvas.width/2)-(ANCHO_GATO/2);
let gatoY=(canvas.height/2)-(ALTO_GATO/2);
let comidaX=canvas.width-ANCHO_COMIDA;
let comidaY=canvas.height-ALTO_COMIDA;

let tiempo=10;

function graficarGato(){
    graficarRectangulo(gatoX,gatoY,ANCHO_GATO,ALTO_GATO,"#391006");
}

function graficarComida(){
    graficarRectangulo(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA,"#27b83f");
}

function iniciarJuego(){
    graficarGato();
    graficarComida();

    setInterval(restarTiempo, 1000);
}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ancho,alto);
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function moverIzquierda(){
    gatoX=gatoX-10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverDerecha(){
    gatoX=gatoX+10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverArriba(){
    gatoY=gatoY-10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();    
}

function moverAbajo(){
    gatoY=gatoY+10;
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
            
        alert("¡comido!");

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
}