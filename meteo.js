'use strict';
//llamamos funciones-----------------------------------------
const express = require('express'); //http
const axios = require('axios'); // Importar Axios para realizar peticiones HTTP
const app = express(); //descargar cosas
const port = 3000;

//                  API Key de OpenWeather 
const API_KEY = '8c0d35f0c42de29f952cc74660cacc14';

// Ruta para obtener el clima de una ciudad específica
//           1      2             1    2
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city; // Obtener el nombre de la ciudad desde la URL
  //                                                          agrega ES | (solo españa)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${API_KEY}&units=metric&lang=es`;

  try {
    // Realizar la petición a la API de OpenWeather
    const response = await axios.get(url);

    // La información que agarro sobre el clima
    const data = response.data;
    const weatherInfo = {
      ciudad: data.name,
      temperatura: data.main.temp,
      descripcion: data.weather[0].description,
      humedad: data.main.humidity,
      viento: data.wind.speed
    };

    // Enviar la información como respuesta------------------------------------------------------
    res.json(weatherInfo);
//-------------------- Por si ocurre algún error muestra lo siguiente:
  } catch (error) {
    // errores, como ciudad no encontrada o problemas con la API para saber que pasa
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else {
      res.status(500).json({ error: 'Error al obtener el clima' });
    }
  }
});

// Esto es lo que aparece al momento de inspeccionar
app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`);
});
