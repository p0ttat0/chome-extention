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