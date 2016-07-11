var palabraSecreta = "triangulo";

var Ahorcado = function(contexto, palabraSecreta){
    this.contexto = contexto;
    this.maxIntentos = 5;
    this.intentos = 0;
    this.vivo = true;
    this.palabraSecreta = new PalabraSecreta(contexto, palabraSecreta);
    
    this.dibujar();
}

PalabraSecreta = function(contexto, palabra){
    this.contexto = contexto;
    this.palabra = palabra;
    
    this.trazarPalabraSecreta();
}

PalabraSecreta.prototype.trazarPalabraSecreta = function(){
    var dibujo = this.contexto;
    var puntoInicial = 20;
    var puntoFinal = 20;
    
    console.log(this.palabra.split('').length);
    for(var i = 0; i < this.palabra.split('').length; i++){
        dibujo.beginPath();
        dibujo.moveTo(puntoInicial, 250);
        dibujo.lineTo(puntoInicial + puntoFinal, 250);
        dibujo.lineWidth = 2;
        dibujo.strokeStyle = "#000000";
        dibujo.stroke();
        dibujo.closePath();
        
        puntoInicial += 30;
    }
}

Ahorcado.prototype.dibujar = function (){
    var dibujo = this.contexto;
    
    dibujo.beginPath();
    dibujo.moveTo(400, 75);
    dibujo.lineTo(400, 50);
    dibujo.lineTo(550, 50);
    dibujo.lineTo(550, 350);
    dibujo.lineWidth = 7;
    dibujo.strokeStyle = "#000000";
    dibujo.stroke();
    dibujo.closePath();
    
    if(this.intentos > 0){
        if(this.intentos == 1){
            this.trazarAhorcado(400, 105, null, null, 1, 30);
        }else if(this.intentos == 2){
            this.trazarAhorcado(400, 135, 400, 255, 2, null);
        }else if(this.intentos == 3){
            this.trazarAhorcado(400, 135, 370, 175, 2, null);
            this.trazarAhorcado(400, 135, 430, 175, 2, null);
        }else if(this.intentos == 4){
            this.trazarAhorcado(400, 255, 375, 300, 2, null);
            this.trazarAhorcado(400, 255, 425, 300, 2, null);
        }else if(this.intentos == 5){
            this.trazarAhorcado(380, 105, null, null, 3, "X");
            this.trazarAhorcado(410, 105, null, null, 3, "X");
        }
    }
}

Ahorcado.prototype.trazar = function(){
    this.intentos ++;
    if(this.intentos >= this.maxIntentos){
        this.vivo = false;
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 35px; color: red;'>¡¡¡Perdiste!!!</span>";
    }
    this.dibujar();
}

Ahorcado.prototype.trazarAhorcado = function(xInicial, yInicial, xFinal, yFinal, tipoDibujo, valorDibujo){
    var contextoDibujo = this.contexto;
    contextoDibujo.beginPath();
    
    if(tipoDibujo == 1){ //Circulos
        contextoDibujo.arc(xInicial, yInicial, valorDibujo, 0, Math.PI * 2, false);
        contextoDibujo.strokeStyle = "red";
        contextoDibujo.lineWidth = 2;
    }else if(tipoDibujo == 2){ //Lineas
        contextoDibujo.moveTo(xInicial, yInicial);
        contextoDibujo.lineTo(xFinal, yFinal);
        contextoDibujo.strokeStyle = "red";
        contextoDibujo.lineWidth = 2;
    }else if(tipoDibujo == 3){ //Texto
        contextoDibujo.font = "12px Comic Sans MS";
        contextoDibujo.lineWidth = 2;
        contextoDibujo.strokeText(valorDibujo, xInicial, yInicial);
    }
    
    contextoDibujo.stroke();
    contextoDibujo.closePath();
}

function iniciar(){
    var canvas = document.getElementById("tableroAhorcado");
    canvas.width = 600;
    canvas.height = 400;
    
    var contexto = canvas.getContext("2d");
    var hombre = new Ahorcado(contexto, palabraSecreta);
    hombre.trazar();
    hombre.trazar();
    hombre.trazar();
    hombre.trazar();
    hombre.trazar();
}