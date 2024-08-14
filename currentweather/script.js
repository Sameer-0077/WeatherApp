const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=5b38dfd05f3d5ca88cb3a8885c634f54&units=metric";

const searchCity = document.querySelector('.search input');
const searchbtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const foreCastData = document.querySelector('.fore-cast');
const weather = document.querySelector('.weather');

async function checkWeather(){
    console.log("Getting DATA....");
    const response = await fetch(apiUrl + searchCity.value + apiKey);
    const getData = await response.json();

    weather.style.display = "block";
    weather.classList.add('hidden');
    setTimeout(() => {
        showWeather(getData);
        weather.classList.remove('hidden');
    },700)
    
}

searchbtn.addEventListener('click', ()=>{
    checkWeather();
})

foreCastData.addEventListener('click', ()=>{
    window.location.href = `../showforecast/forecast.html?city=${encodeURIComponent(searchCity.value)}`;
    // foreCast(searchCity.value);
})

searchCity.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Prevent the default action if necessary
        event.preventDefault();

        // Trigger a click on the search button
        searchbtn.click();
    }
});

function showWeather(getData){
    if(getData.name != undefined){
        document.querySelector('.city-name').innerHTML = getData.name;
        document.querySelector('.city-name').style.fontSize = '45px';
        document.querySelector('.city-name').style.color = '#fff';
        document.querySelector('.temp').innerHTML = Math.round(getData.main.temp) + "°c";
        document.querySelector('.wind').innerHTML = (getData.wind.speed).toFixed(1) + " km/h";
        document.querySelector('.humidity').innerHTML = getData.main.humidity + "%";
        document.querySelector('.feel').innerHTML = "Feels like " + Math.round(getData.main.feels_like) + "°C";

        if(getData.weather[0].main == "Clouds"){
            weatherIcon.src = "../images/clouds.png";
        }
        else if(getData.weather[0].main == "Clear"){
            weatherIcon.src = "../images/clear.png";
        }
        else if(getData.weather[0].main == "Rain"){
            weatherIcon.src = "../images/rain.png";
        }
        else if(getData.weather[0].main == "Drizzle"){
            weatherIcon.src = "../images/drizzle.png";
        }
        else if(getData.weather[0].main == "Mist"){
            weatherIcon.src = "../images/mist.png";
        }
    }
    
    else if(getData.name === undefined){
        alert('Please enter a valid city name');
        document.querySelector('.city-name').innerHTML = 'Enter a valid city name';
        document.querySelector('.city-name').style.fontSize = '20px';
        document.querySelector('.city-name').style.color = '#a64242';
        document.querySelector('.temp').innerHTML = "0";
        document.querySelector('.wind').innerHTML = "0";
        document.querySelector('.humidity').innerHTML = "0";
        document.querySelector('.feel').innerHTML = "0";
    }
}