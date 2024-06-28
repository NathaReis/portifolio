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
    const $desc = document.querySelector(".desc");
    const $cep = document.querySelector(".cep");

    $image.src = `http://openweathermap.org/img/wn/${information.data.weather[0].icon}@2x.png`;
    $temp.innerHTML = `${information.data.main.temp} C°`;
    $desc.innerHTML = String(information.data.weather[0].description).toUpperCase();
    $cep.innerHTML = `${information.dataCity.name} ${information.dataCity.country}`;

    setTimeout(() => {
        getCurrentClimate()
        .then(render);
    }, 600000)// 10Minutos atualiza os dados
}
// Inicializa o dados de temperatura
getCurrentClimate()
.then(render);

// CLOCK
setInterval(() => {
    const $hour = document.querySelector("#hour");
    const $min = document.querySelector("#min");
    const now = new Date();
    $hour.innerHTML = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    $min.innerHTML = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
}, 1000);