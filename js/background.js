// Setup periodic alarm when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('weatherUpdate', { periodInMinutes: 1 });
});

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'weatherUpdate') {
        const apiKey = '28f9977d42c888259fed7df0445e3014';
        const city = 'Mississauga';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
            const weatherInfo = {
                description: data.weather[0].main,
                temperature: data.main.temp,
                icon: data.weather[0].icon
            };
            chrome.storage.local.set({ weatherInfo });
            })
            .catch(error => console.error('Error fetching weather data:', error));

        chrome.runtime.sendMessage({ type: 'weatherUpdate', data: weatherInfo });
        console.log("sluif")
    }
});