import axios from "axios";
import chalk from "chalk";

const API_KEY = "93bd212dd0a2178c3901ba2994789957";

function displayWeather(city, weatherData) {
  console.log(chalk.yellow("🌎🏕🏖🏜⛰🏝🗺🌅🌤⛅⛈☁🌫🌪🌑⭐🌛🌈🌬⚡❄💧"));
  console.log(
    chalk.green(`El clima en ${city} es de ${weatherData.main.temp} grados`)
  );
  console.log(
    chalk.green(`La humedad es de ${weatherData.main.humidity} grados`)
  );
  console.log(
    chalk.green(`La presión es de ${weatherData.main.pressure} grados`)
  );
  console.log(
    chalk.green(
      `La velocidad del viento es de ${weatherData.wind.speed} grados`
    )
  );
  console.log(
    chalk.green(`La dirección del viento es de ${weatherData.wind.deg} grados`)
  );
  console.log(
    chalk.green(
      `La temperatura máxima es de ${weatherData.main.temp_max} grados`
    )
  );
  console.log(
    chalk.green(
      `La temperatura mínima es de ${weatherData.main.temp_min} grados`
    )
  );
  console.log(chalk.yellow("🌎🏕🏖🏜⛰🏝🗺🌅🌤⛅⛈☁🌫🌪🌑⭐🌛🌈🌬⚡❄💧"));
}

function handleError(error) {
  console.log(chalk.red("Error: ", error.message));
  process.exit(1);
}

async function getWeather(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    let response = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
    throw new Error(`No es posible obtener el clima de ${city} `);
  }
}

function initApp() {
  let city = process.argv[2];

  if (!city) {
    console.log(chalk.red("Please enter a city name"));
    console.log(
      chalk.red("Ejecuta el siguiente comando: node app.js [nombre ciudad]")
    );
  }

  getWeather(city)
    .then((weatherData) => displayWeather(city, weatherData))
    .catch(handleError);
}

initApp();
