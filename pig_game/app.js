// ------------------- Variables and Functions declarations -------------------

let scores,roundScore, activePlayer, gameState;

const init = () => {
// 1. Define initial states 
    gameState = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
// 2. Reset all text content
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
 // 3. Reset all classes 
    const disabledBtn = document.querySelectorAll('.disabled');
    if (disabledBtn) for (i = 0; i < disabledBtn.length; i++) { disabledBtn[i].classList.remove('disabled') };
    if (document.querySelector('.winner')) document.querySelector('.winner').classList.remove('winner');

    document.querySelector('.dice').classList.remove('hide');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  
}

const changePlayer = () => {
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

const resetRoundScore = () => {
    document.getElementById('current-' + activePlayer).textContent = 0;
    roundScore = 0;
}

const btnRules = document.getElementById('btn-rules');
const btnBack = document.getElementById('btn-back');


// Let's Roll!!
// ------------------- Initialise the game -------------------
init();

// ------------------- Roll the dice -------------------
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gameState) {
        // 1. Set the random dice number
        dice = Math.ceil(Math.random() * 6);
        // 2. Update the dice display
        document.querySelector('.dice').src = 'dice-' + dice + '.png'
        // 3. Update ROUND score
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        // 4. If hit 1, reset round score     
        } else {
            resetRoundScore();
            // 5. Change active player
            changePlayer();
        };
    };
});

// ------------------- Hold the ROUND score -------------------
document.querySelector('.btn-hold').addEventListener('click', () => {
    let activePlayerDOM = document.querySelector('.player-' + activePlayer + '-panel');
// 1. Add the total ROUND score into the GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
// 2. Reset current score to zero
    resetRoundScore();
// 3. Check if the GLOBAL score has reached 100, then that player wins and disable the game.
    if (scores[activePlayer] >= 100) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').classList.add('hide');
        activePlayerDOM.classList.add('winner');
        activePlayerDOM.classList.remove('active'); 
        gameState = false;
        document.querySelector('.btn-roll').classList.add('disabled');
        document.querySelector('.btn-hold').classList.add('disabled');
    } else {
// 4. Change the player 
        changePlayer()
    };
});

// ------------------- Reset Score with NEW GAME button -------------------
document.querySelector('.btn-new').addEventListener('click', init);


// ------------------- Display Rules -------------------
btnRules.addEventListener('click', () => {    
// 1. Hide current panel 
    const elementToHide = document.querySelectorAll('.to-hide');
    for (i = 0; i < elementToHide.length; i++) { elementToHide[i].classList.add('hide') };
// 2. Show rules panel 
    document.querySelector('.player-rules-panel').classList.remove('hide');
// 3. Replace Rules button with back button 
    btnRules.classList.toggle('show-tab');
    btnBack.classList.toggle('hide');
    btnBack.classList.toggle('show-tab');   
});


// ------------------- Close Rules -------------------
btnBack.addEventListener('click', () => {
// 1. Show original panel 
    const elementToHide = document.querySelectorAll('.to-hide');
    for (i = 0; i < elementToHide.length; i++) { elementToHide[i].classList.toggle('hide') };
// 2. Hide rules panel 
    document.querySelector('.player-rules-panel').classList.toggle('hide');
// 3. Replace back button with Rules button 
    btnRules.classList.toggle('show-tab');
    btnBack.classList.toggle('hide');
    btnBack.classList.toggle('show-tab');   
});