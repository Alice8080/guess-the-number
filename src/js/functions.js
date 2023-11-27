import { Game } from './Game.js';

const numbersForm = document.querySelector('.game__options');
const newGameBtn = document.getElementById('new-game');
const gameForm = document.getElementById('game');
const lessOrMore = document.getElementById('less-or-more');
const hint = document.getElementById('hint');
const warning = document.getElementById('warning');
const attempts = document.getElementById('attempts');
const final = document.getElementById('final');
const hints = document.querySelector('.game__hints');
const input = document.getElementById('guess');

export function selectNumbers() { // Выбор минимального и максимального числа
    warning.textContent = '';
    attempts.textContent = '';
    final.textContent = '';
    lessOrMore.textContent = '';
    gameForm.style.display = 'none';
    numbersForm.style.display = 'block';
    hints.style.display = 'none';

    numbersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const numbers = new FormData(e.target);
        const data = Object.fromEntries(numbers);
        startGame(data);
    });
}

function startGame(data) { // Начать новую игру
    numbersForm.style.display = 'none';
    gameForm.style.display = 'flex';
    hints.style.display = 'block';
    input.value = '';

    const game = new Game(data); // Создание нового объекта игры
    gameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const number = new FormData(e.target);
        const data = Object.fromEntries(number);
        if (!data.guess.length) {
            warning.textContent = 'Введите число';
            return;
        } else {
            warning.textContent = '';
        }
        hints.style.display = 'block';
        if (!game.isFinal) {
            game.move(data.guess, lessOrMore, hint, warning, attempts, final);
        }
    });

    newGameBtn.onclick = selectNumbers;
}

export function random(min, max) { // Рандомное число от минимума до максимума включительно
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
