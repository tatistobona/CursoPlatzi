var dibujo, lienzo, lineasUsuario, btnDibujar;
function inicio(){
    lineasUsuario = document.getElementById("numeroLineas");
    btnDibujar = document.getElementById("btnDibujar");
    dibujo = document.getElementById("dibujito");
    lienzo = dibujo.getContext("2d");
    
    btnDibujar.addEventListener("click", dibujarGrilla);
}

function dibujarCirculo(l){
    var x = 150, y = 150;
    var grd = l.createRadialGradient(x, y, 35, x, y, 100);
    grd.addColorStop(0, "#6600CC");
    grd.addColorStop(1, "#FFFFFF");
    
    l.beginPath();
    l.fillStyle = grd;
    l.arc(x, y, 100, (Math.PI * 2), false);
    l.fill();
    l.closePath();
    l.stroke();
}

function dibujarGrilla(l){
    var l = lienzo;
    var ancho = 300;
    var rayas = Number(lineasUsuario.value);
    var anchoLinea = ancho / rayas;
    var limiteX = ancho / anchoLinea;
    
    var x = 0;
    var y = 0;
    var i2 = 0;
    var alternaColor = false;
    
    for(var i = 0; i <= limiteX; i++){
        while(i2 <= limiteX && x <= ancho){
            colorCuadrado(l, i2, alternaColor);
            l.fillRect(x, y, anchoLinea, anchoLinea);
            l.strokeRect(x, y, anchoLinea, anchoLinea);
            x += anchoLinea;
            i2 ++;
        }
        if( !alternaColor ){
            alternaColor = true;
        }else{
            alternaColor = false;
        }
        i2 = 0;
        x = 0;
        y += anchoLinea;
    }
    
    dibujarCirculo(lienzo);
}

function colorCuadrado(lc, i, alterna){
    var color;
    if( !alterna ){
        if(i % 2 == 0){
            color = "#FFCCFF";
        }else{
            color = "#FA55F5";
        }
    }else{
        if(i % 2 != 0){
            color = "#FFCCFF";
        }else{
            color = "#FA55F5";
        }
    }
    
    lc.fillStyle = color;
}