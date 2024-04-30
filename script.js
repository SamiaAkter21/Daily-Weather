document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
});

async function fetchWeatherData() {
    try{
        const API_KEY = '911db19fc4fe417ab62105956242904';
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Dhaka&days=7`;
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const infos = await response.json();
        
        console.log(infos);
        displayWeatherData(infos);
    }
    catch(error){
        console.error('Error fetching weather data:', error);
        displayErrorMessage('Failed to fetch weather data. Please try again later.');
    }
}

function displayWeatherData(infos) {
    const weatherInfoContainer = document.querySelector('.weather-info');

    const weatherHTML = `
        <div>
            <h1>Today's Weather</h1>
            <h3>${infos.location.name}, ${infos.location.country}</h3>
            <h4>Date & Time: ${infos.location.localtime}</h4>
            <p>Temperature: ${infos.current.temp_c}°C</p>
            <p>Condition: ${infos.current.condition.text} <br> <img src="${infos.current.condition.icon}" alt="Weather Icon"></p>
        </div>
    `;
            
    weatherInfoContainer.innerHTML = weatherHTML;
    
    const weatherForecastContainer = document.querySelector('.weather-forecast').getElementsByTagName('tbody')[0];
    
    weatherForecastContainer.innerHTML = "";
    
    weatherForecastContainer.innerHTML=`<thead>
        <tr>
            <th>Date</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Minimum Temperature</th>
            <th>Maximum Temperature</th>
            <th>Weather Condition of Day</th>
        </tr>
    </thead>`
    
    infos.forecast.forecastday.map((info) => {
        weatherForecastContainer.innerHTML+= `<tbody
        <tr>
            <td>${info.date}</td>
            <td>${info.astro.sunrise}</td>
            <td>${info.astro.sunset}</td>
            <td>${info.day.mintemp_c}°C</td>
            <td>${info.day.maxtemp_c}°C</td>
            <td>${info.day.condition.text} <br> <img src="${info.day.condition.icon}"</td>
        </tr>
        </tbody>`
    });
}

function displayErrorMessage(message) {
    const weatherInfoContainer = document.querySelector('.weather-info');
    weatherInfoContainer.innerHTML = `<p class="error-message">${message}</p>`;
}
