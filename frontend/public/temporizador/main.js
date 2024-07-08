const cityName = 'Sete Lagoas';
const apiKey = 'af771379a3ebcb50459501b069cdebc8';

const getDataCity = async (cityName, apiKey) => {

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(cityName)}&appid=${apiKey}`;
    const results = await fetch(apiUrl);
    const resultsUrl = results.url;

    const data = await fetch(resultsUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));

    return data[0];
}

const getCurrentClimate = async () => {
    const dataCity = new City(await getDataCity(cityName, apiKey));

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${dataCity.lat}&lon=${dataCity.lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    const results = await fetch(apiUrl);
    const resultsUrl = results.url;

    const data = await fetch(resultsUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err));

    const information = {data: data, dataCity: dataCity}

    return information;
}

const render = (information) => {
    const $image = document.querySelector("#image");
    const $temp = document.querySelector(".temp");

    $image.src = `http://openweathermap.org/img/wn/${information.data.weather[0].icon}@2x.png`;
    $temp.innerHTML = `${information.data.main.temp} C°`;

    setTimeout(() => {
        getCurrentClimate()
        .then(render);
    }, 600000); // 10Minutos atualiza os dados
}
// Inicializa o dados de temperatura
getCurrentClimate()
.then(render);

// CLOCK
const lessThanTeen = (numero) => {
    return +numero < 10 ? `0${numero}` : numero; 
}

let intervalo;
let paused = false;
const selectTime = (element) => {
    let $hour = document.querySelector("#hour");
    let $min = document.querySelector("#min");
    let sec = 0;
    const time = element.value.split(":");
    element.style.display = 'none';

    let hour = time[0];
    let min = time[1];

    intervalo = setInterval(() => {
        sec--;
        if(sec < 0) {
            if(min > 0) {
                min--;
                sec = 59;
                if(min < 0) {
                    if(hour > 0) {
                        hour--;
                        min = 59;
                    }
                }
            }
            else if(hour > 0) {
                min = 59;
                sec = 59;
                hour--;
            }
        }
        if(hour == 0 && min == 0 && sec <= 0) {
            clearInterval(intervalo);
            element.style.display = 'block';
            element.value = `${lessThanTeen(+hour)}:${lessThanTeen(+min)}`;
        }

        // Fill
        $hour.innerHTML = lessThanTeen(+hour);
        $min.innerHTML = lessThanTeen(+min);
    }, 1000)
}