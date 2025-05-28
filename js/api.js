function getWeather(){
    // fetch weather
    const apiKey = '28f9977d42c888259fed7df0445e3014';
    const city = 'Mississauga'; // Change to your desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const weatherDescription = data.weather[0].main;
        const temperature = data.main.temp; 

        document.getElementById('weather').innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="image unavailble" >
        <p style='font-weight: bold;'>${weatherDescription}</p>
        <p>${temperature}&deg;C</p>

        `;
    })
    .catch(error => console.error('Error fetching the weather data:', error));
}

export {getWeather}