var buscaminas = [ [randomBuscaminas(0, 1), randomBuscaminas(0, 1), randomBuscaminas(0, 1)],
                   [randomBuscaminas(0, 1), randomBuscaminas(0, 1), randomBuscaminas(0, 1)],
                   [randomBuscaminas(0, 1), randomBuscaminas(0, 1), randomBuscaminas(0, 1)] ];

function randomBuscaminas(minimo, maximo){
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

function jugarBuscaminas(posicionX, posicionY){
    if(buscaminas[posicionX][posicionY] == 0){
        document.getElementById("position_" + posicionX + "_" + posicionY).innerHTML = "<a href='#'><img src='img/no_boom.png' height='120' width='120'></a>";
    }else{
       document.getElementById("position_" + posicionX + "_" + posicionY).innerHTML = "<a href='#'><img src='img/boom.jpg' height='120' width='120'></a>";
    }
}