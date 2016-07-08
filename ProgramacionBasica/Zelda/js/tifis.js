var tablero;
var fondo, diana, liz;
var updateLiz = 0;
var tecla = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

function objectPosition(imagenUrl, imgenOnLoadOk, functionOnLoad){
    this.imagenOnLoadOk = imgenOnLoadOk;
    this.imagen = new Image();
    this.imagen.src = imagenUrl;
    this.imagen.onload = functionOnLoad;
}

function objectGame(x, y, imagenUrl, imagenOnLoadOk, functionOnLoad){
    this.x = x;
    this.y = y;
    this.imagenOnLoadOk = imagenOnLoadOk;
    this.imagen = new Image();
    this.imagen.src = imagenUrl;
    this.imagen.onload = functionOnLoad;
    
}

function inicio(){
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");
    
    fondo = new objectGame(0, 0, "img/fondo.png", false, confimarImagenOnLoadFondo);
    
    liz = new objectGame(random(0, 450), random(0, 450), "img/liz.png", false, confimarImagenOnLoadLiz);
    
    diana = new objectGame(0, 0, "img/diana-frente.png", false, confimarImagenOnLoadDiana);
    diana.izquierda = new objectPosition("img/diana-izq.png", false, confirmarImagenOnLoadDianaIzq);
    diana.derecha = new objectPosition("img/diana-der.png", false, confirmarImagenOnLoadDianaDer);
    diana.atras = new objectPosition("img/diana-atras.png", false, confirmarImagenOnLoadDianaAtras);
    diana.velocidad = 10;
    diana.tamano = 50;
    
    document.addEventListener("keydown", teclado);
}

function dibujar(direccion){
    if(fondo.imagenOnLoadOk){
        tablero.drawImage(fondo.imagen, fondo.x, fondo.y);
    }
    
    if( diana.imagenOnLoadOk || diana.izquierda.imagenOnLoadOk || diana.derecha.imagenOnLoadOk || diana.atras.imagenOnLoadOk){
        tablero.drawImage(getPosition(direccion), diana.x, diana.y);
    }
    
    if(liz.imagenOnLoadOk){
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }
    
    if(liz.imagenOnLoadOk && updateLiz == 10){
        updateLiz = 0;
        liz.x = random(0, 450);
        liz.y = random(0, 450);
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }
}

function getPosition(direction){
    if(direction == tecla.UP){
        return diana.atras.imagen;
    }else if(direction == tecla.DOWN){
        return diana.imagen;
    }else if(direction == tecla.LEFT){
        return diana.izquierda.imagen;
    }else if(direction == tecla.RIGHT){
        return diana.derecha.imagen;
    }
    
    return diana.imagen;
}

function teclado(event){
    updateLiz += 1;
    
    if(event.keyCode == tecla.UP){
        if( diana.y > 0 &&
            !( ( diana.y  == 250 && diana.x <= 130 )  || 
               ( diana.y == 400 && diana.x >= 120) || 
               ( diana.y == 250 && diana.x >=170 && diana.x <= 230 ) ) ){
            diana.y -= diana.velocidad;
        }
    }

    if(event.keyCode == tecla.DOWN){
        if( diana.y < 450 && 
            !( ( diana.y  == 150 && diana.x <= 130 )  || 
               ( diana.y == 300 && diana.x >= 120) ) ){
           diana.y += diana.velocidad;
        }
    }

    if(event.keyCode == tecla.LEFT){
        if( diana.x > 0 && 
            !( ( diana.x  == 240 && diana.y <= 240 ) || 
               ( diana.x == 140 && diana.y >= 150 && diana.y <= 240 ) ) ){
            diana.x -= diana.velocidad;
        }
    }

    if(event.keyCode == tecla.RIGHT){
        if( diana.x < 450 &&
            !( ( diana.x  == 160 && diana.y <= 240 ) || 
               ( diana.x == 110 && diana.y >= 310 && diana.y <= 390 ) ) ){
            diana.x += diana.velocidad;
        }
    }
    
    dibujar(event.keyCode);
}

function random(minimo, maximo){
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

function confimarImagenOnLoadFondo(){
    fondo.imagenOnLoadOk = true;
    dibujar();
}

function confimarImagenOnLoadDiana(){
    diana.izquierda.imagenOnLoadOk = true;
    dibujar();
}

function confirmarImagenOnLoadDianaIzq(){
    diana.derecha.imagenOnLoadOk = true;
    dibujar();
}

function confirmarImagenOnLoadDianaDer(){
    diana.atras.imagenOnLoadOk = true;
    dibujar();
}

function confirmarImagenOnLoadDianaAtras(){
    diana.imagenOnLoadOk = true;
    dibujar();
}

function confimarImagenOnLoadLiz(){
    liz.imagenOnLoadOk = true;
    dibujar();
}