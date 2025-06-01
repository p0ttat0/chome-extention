import {spinReels } from "./slotMachine.js"
import {cardsInit, appWaffleLinksContainerInit} from "./elementInit.js"

window.onload = function() {
    //initialize elements
    cardsInit();
    appWaffleLinksContainerInit();
    const root = document.getElementsByTagName('html')[0];
    const slotMachine = document.getElementById('slotMachine');
    const chipStacks = document.getElementsByClassName('chipStacks');
    const cards = document.getElementsByClassName('cards');
    const dice = document.getElementsByClassName('dice');
    const GoogleSearchTextInput = document.getElementById('GoogleSearchTextInput');
    const googleLogo = document.getElementById('googleLogo');

    //initialize local storage
    localStorage.setItem("scale", (localStorage.getItem("scale") == null) ? 1 : localStorage.getItem("scale"));
    localStorage.setItem("speed", (localStorage.getItem("speed") == null) ? 1 : localStorage.getItem("speed"));
    localStorage.setItem("searchBoxColor", (localStorage.getItem("searchBoxColor") == null) ? 1 : localStorage.getItem("searchBoxColor"));
    
    // set scaling
    const defaultFontSize = screen.height/1080*16;
    let scale = localStorage.getItem("scale");
    root.style.fontSize = `${scale*defaultFontSize}px`;

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
        let animationDelay = 0.9 + i*0.5;
        dice[i].style.setProperty('--animationDelay', `${animationDelay}s`);
        dice[i].classList.toggle('diceAnimation');
    }

    //initialize listners
    window.addEventListener('storage', (event) => {
        console.log(event.key)
        switch(event.key){
            case 'scale':
                root.style.fontSize = `${event.newValue*defaultFontSize}px`;
                break;
            case 'searchBoxColour':
                if (event.newValue === "red"){
                    googleLogo.style.textShadow = ` 0 0 0.4rem #fff,
                                                    0 0 0.6rem #fff,
                                                    0 0 1.3rem #ff0000,
                                                    0 0 2.4rem #ff0000,
                                                    0 0 4.8rem #ff0000,
                                                    0 0 5.3rem #ff0000,
                                                    0 0 5.9rem #ff0000;`;
                    GoogleSearchTextInput.style.textShadow = `  0 0 .1em #fff,
                                                                0 0 .1em #fff,
                                                                0 0 0.9em #ff0000,
                                                                0 0 0.2em #ff0000,
                                                                0 0 1em #ff0000,
                                                                inset 0 0 0.5em #ff0000;`
                } else if (event.newValue === "green"){
                    googleLogo.style.textShadow = ` 0 0 0.4rem #fff,
                                                    0 0 0.6rem #fff,
                                                    0 0 1.3rem #00ff00,
                                                    0 0 2.4rem #00ff00,
                                                    0 0 4.8rem #00ff00,
                                                    0 0 5.3rem #00ff00,
                                                    0 0 5.9rem #00ff00;`;
                    GoogleSearchTextInput.style.textShadow = `  0 0 .1em #fff,
                                                                0 0 .1em #fff,
                                                                0 0 0.9em #00ff00,
                                                                0 0 0.2em #00ff00,
                                                                0 0 1em #00ff00,
                                                                inset 0 0 0.5em #00ff00;`
                } else {
                    console.error('Error changing search colour to ', event.newValue);
                }
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