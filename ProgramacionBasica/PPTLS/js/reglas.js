var game = {rock: {option: 0, img: 'img/rock.png'}, 
            paper: {option: 1, img: 'img/paper.png'}, 
            scissors: {option: 2, img: 'img/scissors.png'}, 
            lizard: {option: 3, img: 'img/lizard.png'}, 
            spock: {option: 4, img: 'img/spock.png'}, };

function randomOptionComputer(minimo, maximo){
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

function optionSelectedUser(optionUser){
    var optionComputer = randomOptionComputer(0, 4);
    
    document.getElementById("user").innerHTML = "<a href='#'><img src=" + getImagen(optionUser) + " height='120' width='120'></a>";
    document.getElementById("pc").innerHTML = "<a href='#'><img src=" + getImagen(optionComputer) + " height='120' width='120'></a>";
    
    if(optionUser == optionComputer){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: green;'>Empatados!!! :|</span>";
    }else if(optionUser == game.scissors.option && (optionComputer == game.paper.option || optionComputer == game.lizard.option)){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: blue;'>Ganaste!!! :-D</span>";
    }else if(optionUser == game.paper.option && (optionComputer == game.rock.option || optionComputer == game.spock.option)){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: blue;'>Ganaste!!! :-D</span>";
    }else if(optionUser == game.rock && (optionComputer == game.lizard.option || optionComputer == game.scissors.option)){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: blue;'>Ganaste!!! :-D</span>";
    }else if(optionUser == game.lizard.option && (optionComputer == game.spock.option || optionComputer == game.paper.option)){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: blue;'>Ganaste!!! :-D</span>";
    }else if(optionUser == game.spock.option && (optionComputer == game.scissors.option || optionComputer == game.rock.option)){
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: blue;'>Ganaste!!! :-D</span>";
    }else{
        document.getElementById("result").innerHTML = "<span style='font-family: Indie Flower, cursive; font-size: 60px; color: red;'>Perdiste!!! :-(</span>";
    }
}

function getImagen(option){
    if(option == game.rock.option){
        return game.rock.img;
    }else if(option == game.paper.option){
        return game.paper.img;
    }else if(option == game.scissors.option){
        return game.scissors.img;
    }else if(option == game.lizard.option){
        return game.lizard.img;
    }else if(option == game.spock.option){
        return game.spock.img;
    }
    return null;
}