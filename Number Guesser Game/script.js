let message = 'Do you want to play the number guessing game?';
var text = document.querySelector('h4');

startGame(message);

document.querySelector('.button').addEventListener('click', function () {
    startGame(message);
})


function startGame(message) {
    if (confirm(message)) {
        playGame();
    } else {
        if(text.textContent.trim() === "") {
            text.appendChild(document.createTextNode("Click here to play the game"));
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playGame() {
    let random_number = this.getRandomIntInclusive(1, 10);
    let win = false;
    for (let i = 0; i < 3; i++) {
        let user_number = prompt('Enter a number between 1 to 10');
        console.log(user_number);
        console.log(random_number);
        if (user_number === null) {
            alert('You have not provided any number!');
            break
        }
        else if (user_number == random_number) {
            alert('Hurray! You won the game!');
            win = true;
            break;
        }
        else if (user_number < random_number) {
            alert('Correct answer is greater!');
        }
        else if (user_number > random_number) {
            alert('Correct answer is smaller!');
        }
        else {
            console.log(user_number);
            alert('Wrong Input!!!');
            break;
        }
    }
    if (!win) {
        alert('Sorry! You lost the game.');
    }
    startGame('Do you want to play again?');
}



