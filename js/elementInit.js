export {cardsInit, appWaffleLinksContainerInit}

function cardsInit(){
    const cardsContainer = document.getElementById('cardsContainer')
    const suits = ['}',']','{','[']

    //creates cards
    for (let i = 0; i < 4; i++) {
        let suit = suits[i]
        let color = (i<2) ? 'black' : 'red';
        
        cardsContainer.insertAdjacentHTML('beforeend', 
            `   <div class="cards" style='--color: ${color}'>
                    <div class='cardTL'>
                        <p>A</p> 
                        <p>${suit}</p>
                    </div>
                    <div class='cardsC'>
                        <h1>${suit}</h1>
                    </div>
                    <div class='cardBR'>
                        <p>A</p> 
                        <p>${suit}</p>
                    </div>
                </div>
            `)
    }

    //shuffles cards
    for (let i = 0; i < 4; i++) {
        cardsContainer.appendChild(cardsContainer.children[Math.random() * i | 0]);
    }
}

function appWaffleLinksContainerInit(){
  const appWaffleLinksContainer = document.getElementById('appWaffle_links_container')
  fetch('./json/appWaffleLinks.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.len; i++){
        appWaffleLinksContainer.insertAdjacentHTML('beforeend', `
          <a href="${data.apps_dict[i][0]}" style="text-decoration: none;">
            <div class="appWaffle_link_icons">
              <img src="/images/linkIcons/${data.apps_dict[i][1]}" alt="">
              <span>${data.apps_dict[i][2]}</span>
            </div>
          </a>
        `)
      }
    })
    .catch(error => console.error('Error:', error));
}