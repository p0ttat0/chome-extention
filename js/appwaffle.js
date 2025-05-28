const appWaffle_links_container = document.getElementById('appWaffle_links_container')
fetch('./json/appWaffleLinks.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.len; i++){
      appWaffle_links_container.insertAdjacentHTML('beforeend', `
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