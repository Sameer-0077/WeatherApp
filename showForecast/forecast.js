const api = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const apiKey = '&appid=5b38dfd05f3d5ca88cb3a8885c634f54&units=metric';

const cityName = document.querySelector('.search-bar input');
const btnSearch = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-icon');
const prevDay = document.querySelector('.prev');
const nextDay = document.querySelector('.next');
const weather = document.querySelector('.weather');
const day = document.querySelector('.day');

document.querySelector('.home').addEventListener('click', () => {
    window.location.href = '../CurrentWeather/index.html';
})

function getCityNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('city');
}

const mainCity = getCityNameFromUrl();

if (mainCity) {
    foreCast(mainCity);
} 

cityName.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Prevent the default action if necessary
        event.preventDefault();

        // Trigger a click on the search button
        btnSearch.click();
    }
});

// const getDayData = document.querySelector('.fore-cast');
async function foreCast(mainCity) {
    let url;
    if(mainCity){
        url = api+mainCity+apiKey;
    }
    else{
        url = api+cityName.value+apiKey;
    }
    const response = await fetch(url);
    const getData = await response.json();
    console.log(getData);
    let i = 0;

    if(getData.message === 'city not found'){
        alert('Please enter a valid city name');
    }

    weather.classList.add('hidden');

    setTimeout(() => {
        showWeather(getData, i);
        weather.classList.remove('hidden');
    },700)

        nextDay.addEventListener('click', () => {
            if(i < 32){
                i = i + 8;
                weather.classList.add('hidden');
                setTimeout(() => {
                    showWeather(getData, i);
                     weather.classList.remove('hidden');
                },700)

            }
        })
        prevDay.addEventListener('click', () => {
            if(i > 7){
                i = i - 8;
                weather.classList.add('hidden');
                setTimeout(() => {
                    showWeather(getData, i);
                     weather.classList.remove('hidden');
                },700)
            }
        })
        

    
}

btnSearch.addEventListener('click', () => {
    foreCast();
})


function showWeather(getData, index){

    if(index === 0){
        prevDay.style.opacity = '0';
    }
    else{
        prevDay.style.opacity = '0.8';
        // prevDay.addEventListener('mouseover', () => {
        //     prevDay.style.opacity = '1';
        // });
        // prevDay.addEventListener('mouseout', () => {
        //     prevDay.style.opacity = '0.2';
        // });
    }
    if(index === 32){
        nextDay.style.opacity = '0';
    }
    else{
        nextDay.style.opacity = '0.8';
        // nextDay.addEventListener('mouseover', () => {
        //     nextDay.style.opacity = '1';
        // });
        // nextDay.addEventListener('mouseout', () => {
        //     nextDay.style.opacity = '0.2';
        // });
    }

    if(index === 0){
        day.innerHTML = 'Day 1';
    }else if(index === 8){
        day.innerHTML = 'Day 2';
    }
    else if(index === 16){
        day.innerHTML = 'Day 3';
    }
    else if(index === 24){
        day.innerHTML = 'Day 4';
    }
    else if(index === 32){
        day.innerHTML = 'Day 5';
    }

    document.querySelector('.city-name').innerHTML = getData.city.name;
    document.querySelector('.city-name').style.fontSize = '45px';
    document.querySelector('.city-name').style.color = '#fff';
    document.querySelector('.temp').innerHTML = Math.round(getData.list[index].main.temp) + "°C";
    document.querySelector('.wind').innerHTML = (getData.list[index].wind.speed).toFixed(1) + " km/h";
    document.querySelector('.humidity').innerHTML = getData.list[index].main.humidity + "%";
    document.querySelector('.feel').innerHTML = "Feels like " + Math.round(getData.list[index].main.feels_like) + "°C";
    if(getData.list[index].weather[0].main == "Clouds"){
        weatherIcon.src = "../images/clouds.png";
    }
    else if(getData.list[index].weather[0].main == "Clear"){
        weatherIcon.src = "../images/clear.png";
    }
    else if(getData.list[index].weather[0].main == "Rain"){
        weatherIcon.src = "../images/rain.png";
    }
    else if(getData.list[index].weather[0].main == "Drizzle"){
        weatherIcon.src = "../images/drizzle.png";
    }
    else if(getData.list[index].weather[0].main == "Mist"){
        weatherIcon.src = "../images/mist.png";
    }
}