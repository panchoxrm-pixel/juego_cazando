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

function graficarGato(){
    ctx.fillStyle = "#F2EEED"
    ctx.fillRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO);
}

function graficarComida(){
    ctx.fillStyle ="#27b83f";
    ctx.fillRect(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA);
}

function iniciarJuego(){
    graficarGato();
    graficarComida();
}