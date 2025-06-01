import {spinReels } from "./slotMachine.js"
import {cardsInit, appWaffleLinksContainerInit} from "./elementInit.js"

window.onload = function() {
    //initialize elements
    cardsInit();
    appWaffleLinksContainerInit();
    const body = document.getElementsByTagName('html')[0];
    const slotMachine = document.getElementsByClassName('slotMachine')[0];
    const chipStacks = document.getElementsByClassName('chipStacks');
    const cards = document.getElementsByClassName('cards');
    const dice = document.getElementsByClassName('dice');
    
    // set scaling
    const defaultFontSize = screen.height/1080*16;
    let scale = (localStorage.getItem("scale") == null) ? 1 : localStorage.getItem("scale");
    body.style.fontSize = `${scale*defaultFontSize}px`;

    //card animations
    for (let i = 0; i < 4; i++) {
        let deg = (i*20)-30;    // in (i*x)-y  3x must equall y
        cards[i].style.setProperty('--r', `${deg}deg`);
        cards[i].classList.toggle("cardsAnimation");
    }

    //slot machine animation
    slotMachine.classList.toggle("slotMachineInitAnimation");
    spinReels(true);

    //chipStacks intro animation
    for (let i = 0; i < 2; i++) {
        let rotation = -10 + i*20
        chipStacks[i].style.setProperty('--r', `${rotation}deg`);
        chipStacks[i].classList.toggle('chipStacksAnimation');
    }

    //dice intro animation
    for (let i = 0; i < 2; i++) {
        let animationDelay = 0.6 + i*0.5;
        dice[i].style.setProperty('--animationDelay', `${animationDelay}s`);
        dice[i].classList.toggle('diceAnimation');
    }

    //initialize listners
    window.addEventListener('storage', (event) => {
        switch(event.key){
            case 'scale':
                const newValue = `${event.newValue*defaultFontSize}px`;
                body.style.fontSize = newValue;
                break;
        }
    })

    window.onclick = function(event) {
        if (event.target != null){
            const appWaffle_links_container = document.getElementById('appWaffle_links_container');
            switch(event.target.id){
                case 'appWaffle':   //toggle visablity
                    appWaffle_links_container.classList.toggle("hide");
                    break;
                case 'appWaffle_links_container':
                    break;
                case 'button1':
                case 'button2':
                    spinReels(false);
                    break
                default:
                    appWaffle_links_container.classList.add('hide')    
            }
        }
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'weatherUpdate') {
            const weather = message.data;
            document.getElementById('weather').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="weather">
            <p><strong>${weather.description}</strong></p>
            <p>${weather.temperature}&deg;C</p>
            `;
        }
    });

}