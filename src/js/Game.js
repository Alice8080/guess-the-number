import { random } from "./functions.js";

export class Game { // Класс игры
    constructor({ min, max }) {
        this.min = parseInt(min);
        this.max = parseInt(max);
        this.attempts = 0;
        this.isFinal = false;
        this.answer = random(this.min, this.max);
    }

    move(number, lessOrMore, hint, warning, attempts, final) {
        number = parseInt(number);
        this.isFinal = number === this.answer;
        if (this.isFinal) {
            lessOrMore.textContent = '';
            hint.textContent = '';
            warning.textContent = '';
            attempts.textContent = '';
            final.textContent = `Вы угадали! Загаданное число: ${this.answer}`;
        } else {
            this.attempts++;

            lessOrMore.textContent = `Ваше число ${number > this.answer ? 'больше' : 'меньше'} загаданного`;
            
            if (this.attempts % 3 === 0) {
                hint.textContent = `Загаданное число является ${this.answer % 2 === 0 ? 'четным' : 'нечетным'}`;
            } else {
                hint.textContent = '';
            }

            if (number > this.max) {
                warning.textContent = 'Ваше число больше максимального возможного';
            } else if (number < this.min) {
                warning.textContent = 'Ваше число меньше минимального возможного';
            } else {
                warning.textContent = '';
            }

            attempts.textContent = `Количество попыток: ${this.attempts}`;
        }
    }
}