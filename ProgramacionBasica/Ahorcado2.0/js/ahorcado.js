var palabrasSecretas = [];
palabrasSecretas.push("piso");
palabrasSecretas.push("mama");
palabrasSecretas.push("pelota");
palabrasSecretas.push("enano");
var palabraSecreta = [];
var hombre, letra;

var Ahorcado = function(contexto, palabraSecreta){
    this.contexto = contexto;
    this.maxIntentos = 5;
    this.intentos = 0;
    this.palabraSecreta = new PalabraSecreta(contexto, palabraSecreta);

    this.dibujar();
}

PalabraSecreta = function(contexto, palabra){
    this.contexto = contexto;
    this.palabra = palabra;

    this.trazarPalabraSecreta();
}

PalabraSecreta.prototype.trazarPalabraSecreta = function(caracter){
    var dibujo = this.contexto;
    var puntoInicial = 20;
    var puntoFinal = 20;

    for(var i = 0; i < this.palabra.length; i++){
        if(this.palabra[i] == caracter){
          this.contexto.font = "18px Georgia bold";
          this.contexto.fillText(caracter, (puntoInicial + 3), 245);
        }else{
          dibujo.beginPath();
          dibujo.moveTo(puntoInicial, 250);
          dibujo.lineTo(puntoInicial + puntoFinal, 250);
          dibujo.lineWidth = 2;
          dibujo.strokeStyle = "#000000";
          dibujo.stroke();
          dibujo.closePath();
        }

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
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: green;'>Perdiste!!! :(</span>";
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

    var posicion = random(0, palabrasSecretas.length-1);
    var palabraSeleccionada = palabrasSecretas[posicion];
    palabraSeleccionada = palabraSeleccionada.toUpperCase();

    hombre = new Ahorcado(contexto, palabraSeleccionada);
    palabraSecreta = obtenerPalabraSecreta(palabraSeleccionada);

    letra = document.getElementById("inputLetra");
    var btnJugar = document.getElementById("btnJugar");
    btnJugar.addEventListener("click", agregarLetra);
}

function agregarLetra(){
  var letraSeleccionada = letra.value.toUpperCase();
  var contador = 0;
  var palabraEncontrada = 0;
  for(var i = 0; i < palabraSecreta.length; i++){
    if(palabraSecreta[i].caracter == letraSeleccionada){
      palabraSecreta[i].isIngresada = true;
      contador ++;
      palabraEncontrada ++;

      hombre.palabraSecreta.trazarPalabraSecreta(palabraSecreta[i].caracter);
    }
  }

  if(palabraEncontrada == 0){
    hombre.trazar();
  }else{
    validarEstadoAhorcado();
  }
}

function validarEstadoAhorcado(){
  var contador = 0;
  for(var i = 0; i < palabraSecreta.length; i++){
    if(palabraSecreta[i].isIngresada){
      contador++;
    }
  }

  if(contador == palabraSecreta.length){
    document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: green;'>Ganaste!!! :D</span>";
  }
}

function obtenerPalabraSecreta(palabraSeleccionada){
  var palabraSecreta = [];
  for(var i = 0; i < palabraSeleccionada.length; i++){
    var caracter = palabraSeleccionada[i];
    palabraSecreta.push({ 'caracter': caracter, 'isIngresada': false });
  }

  return palabraSecreta;
}

function random(minimo, maximo){
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}
