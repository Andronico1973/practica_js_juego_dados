'use strict';

// Selecionar elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('currrent--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Condiciones iniciales

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const swichPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

// Funcionalidad giratoria del dado
btnRoll.addEventListener('click', function() {
if (playing) {

    //1 Generar giro del dado
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 Mostrar el dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3 Chequear si el dado muestra el 1:
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
        //si es true, switch al siguiente jugador
        swichPlayer();

    }  
}
});

btnHold.addEventListener('click', function(){

    if (playing) {

    // 1 agregar actual score al score del jugador activo
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2 verificar si el score de los jugadores es >= 100
   if (scores[activePlayer] >= 100) {
    // terminar el juego 
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
   }else {
    // Cambiar al siguiente jugador
    swichPlayer();
   }
}

    
});

btnNew.addEventListener('click', init());
