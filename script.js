const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#timeLeft');
const score = document.querySelector('#score');

let timerId = null;
let penalized = false;
let countdownInterval;
let result = 0;
let hitPosition;
let currentTime = 40;


// Legger molen i en tilfelig rute
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
}

// Gir deg et poeng hvis ruten du trykket på har molen i seg.
// Eller gir et minus poeng hvis du trykket på feil rute.
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
            penalized = false;

        } else if (!penalized) {
            result--;
            score.textContent = result;
            penalized = true;
        }
    });
});

// Denne flytter molen til en annen tilfeldig rute etter 500ms
function moveMole() {
    clearInterval(timerId);
    timerId = setInterval(randomSquare, 500)

}

// Denne viser til tiden
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if (currentTime <= 0) {
       clearInterval(timerId);
       clearInterval(countdownInterval);
       stopCountDown();
       mole.classList.remove('mole');
       
    }
}

// Denne starter tiden
function startCountdown() {
    countdownInterval = setInterval(countDown, 1000);
}

// Denne stopper tiden
function stopCountDown() {
    clearInterval(countdownInterval);
}

// Denne knappen gjør at spillet starter.
function startGame() {
    moveMole();
    startCountdown();
}

// Denne knappen gjør at spillet slutter, og molen blir borte fra den nåværende ruten sin.
function pauseGame() {
    stopCountDown();
    clearInterval(timerId);
    clearInterval(countdownInterval);
    
    if (mole) {
        mole.classList.remove('mole');
    }
    
}
// Her nullstilles alt til sånn det var før man startet spillet og man kan starte på nytt.
function restartGame() {
clearInterval(timerId);
clearInterval(countdownInterval);
stopCountDown();



if(mole){
    mole.classList.remove('mole');
}

currentTime= 40;
result= 0;
hitPosition= 0;
penalized= false;

timeLeft.textContent=currentTime;
score.textContent= result;
}

