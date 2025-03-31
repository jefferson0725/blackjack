/*
2C = Two of Clubs (Treboles)
2D = Two of Diamonds (Diamantes)
2H = Two of HEarts (Corazoness)
2S = Two of Spades (Pica)
*/


let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo')
const puntajeHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Creacion de baraja
const crearDeck = () =>{
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }

    }
    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial+tipo);
        }
    }
     
    deck = _.shuffle(deck)
    return deck;
}
crearDeck()
console.log(deck)

//perdir carta

const perdirCarta = () =>{

    if (deck.length ===0){
        throw 'no hay cartas en el deck';
        
    }
    const carta = deck.pop()

    console.log(deck)

    return carta;
}

//valor de la carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1); 
    return(isNaN (valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;

}




//turno computadora
const turnoComputadora = (puntosMinimo) =>{
    do{
        const carta = perdirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntajeHTML[1].innerText= puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta);
        
        if (puntosMinimo > 21){
            break;
        }
    
    }while( (puntosComputadora < puntosMinimo));
    
    setTimeout(()=>{
        if(puntosComputadora === puntosMinimo){
            alert('empate');
        }else if(puntosMinimo >21){
            alert('Computadora gana')
        }else if(puntosComputadora>21){
            alert('jugador gana')
        }else{
            alert("computadora gana");
        }
    }, 10); //funcion para que las cartas aparezcan despues del mensaje de resultado
}




//eventos

btnPedir.addEventListener('click', () =>{
    const carta = perdirCarta();
    puntosJugador = puntosJugador + valorCarta(carta)
    puntajeHTML[0].innerText= puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta);
    if(puntosJugador > 21){
        console.warn("Perdiste bro");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn("21, GENIAL");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    console.log(puntosJugador)
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click', ()=>{
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;

    puntajeHTML[0].innerText= 0
    puntajeHTML[1].innerText= 0

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";


    crearDeck();
})
