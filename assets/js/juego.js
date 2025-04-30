/*
2C = Two of Clubs (Treboles)
2D = Two of Diamonds (Diamantes)
2H = Two of HEarts (Corazoness)
2S = Two of Spades (Pica)
*/

const miModulo = (() =>{
    'use strict'
    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];
    

    // referencias html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo')

    const puntajeHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');



    //inicializar juego
    const iniciarJuego = (numJugadores = 2)=>{
        deck = crearDeck();
        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);   
        }
        puntajeHTML.forEach(element =>  element.innerText = 0 );

        divCartasJugadores.forEach(element => element.innerHTML = "");


        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Creacion de baraja
    const crearDeck = () =>{
        deck = [];
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
        return _.shuffle(deck);
    }
    

    //perdir carta

    const perdirCarta = () =>{

        if (deck.length === 0){
            alert("No hay cartas en el deck, debe iniciar juego")  
            throw 'no hay cartas en el deck';            
        }
        return deck.pop();
    }
    const valorCarta = (carta) =>{
        const valor = carta.substring(0, carta.length -1); 
        return(isNaN (valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;

    }
    //0: primer jugador y ultimo computadora
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntajeHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }
    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);   
    }
    const determinarGanador = ()=>{
        const [ puntosMinimo, puntosComputadora] = puntosJugadores;
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
        }, 500); //funcion para que las cartas aparezcan antes del mensaje de resultado
    }
    //turno computadora
    const turnoComputadora = (puntosMinimo) =>{
        let puntosComputadora = 0;
        do{
            const carta = perdirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);

            crearCarta(carta, puntosJugadores.length -1);
            
            
            if (puntosMinimo > 21){
                break;
            }
        
        }while( (puntosComputadora < puntosMinimo));
        
        determinarGanador();
        
    }

    //eventos

    btnPedir.addEventListener('click', () =>{
        const carta = perdirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta, 0);



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
        console.log(puntosJugador);
    });

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', ()=>{
        
        iniciarJuego();
        
    })
    return {
        nuevoJuego: iniciarJuego
    }
    
})();

