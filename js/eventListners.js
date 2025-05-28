import {spinReels } from "./slotMachine.js"

function clickListner(){
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
                    spinReels()
                    break
                default:
                    appWaffle_links_container.classList.add('hide')    
            }
        }
    }
}

function localStorageUpdateListner(){
    const body = document.getElementsByTagName('html')[0];
    window.addEventListener('storage', (event) => {
        switch(event.key){
            case 'scale':
            const newValue = `${event.newValue*defaultFontSize}px`;
            body.style.fontSize = newValue;
        }
    })
}

export {clickListner, localStorageUpdateListner};