import { getWeather } from "./api.js";
import { clickListner, localStorageUpdateListner } from "./eventListners.js";
import {spinReels } from "./slotMachine.js"

window.onload = function() {
    //card animations
    const cards = document.getElementsByClassName('cards');
    for (let i = 0; i < 4; i++) {
        let deg = (i*20)-30;    // in (i*x)-y  3x must equall y
        cards[i].style.setProperty('--r', `${deg}deg`);
        cards[i].classList.toggle("cardsAnimation");
    }

    //slot machine animation
    const slotMachine = document.getElementsByClassName('slotMachine')[0];
    slotMachine.classList.toggle("slotMachineAnimation");
    spinReels()

    //chipStacks intro animation
    const chipStacks = document.getElementsByClassName('chipStacks');
    for (let i = 0; i < 2; i++) {
        let rotation = -10 + i*20
        chipStacks[i].style.setProperty('--r', `${rotation}deg`);
        chipStacks[i].classList.toggle('chipStacksAnimation');
    }

    //dice intro animation
    const dice = document.getElementsByClassName('dice');
    for (let i = 0; i < 2; i++) {
        let animationDelay = 0.6 + i*0.5;
        dice[i].style.setProperty('--animationDelay', `${animationDelay}s`);
        dice[i].classList.toggle('diceAnimation');
    }

    getWeather();
    clickListner();
    localStorageUpdateListner();
}