import React, { useState, useEffect } from 'react';
import './App.css';
import { getWeatherData } from './data/weatherapi';
import { ScaleLoader } from 'react-spinners'

function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setcity] = useState('Indore')

  const getData = async () => {
    try {
      const data = await getWeatherData(city)
      setWeatherData(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const override = `
  margin: 0 auto;
  display:block;
  border-color:golden;
  `;

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <div className='card'>
        <h1 className='title'>
          <i class="fas fa-cloud-moon-rain"></i>
          Weather App
        </h1>
        <div className='search-form'>
          <input type='text' onChange={(e) => setcity(e.target.value)} placeholder='Enter Place to Search' />
          <button type='search' onClick={() => getData()}>Search</button>
        </div>
        {loading ? (
          <div className='loader-container'>
            <ScaleLoader
              css={override}
              size={200}
              color={"#fff"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {weatherData !== null ? (
              <div className='main-container'>
                <h1>Live Weather Conditions</h1>
                <div className='weather-icon'>
                  <img src={`http://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='weather desc' />
                </div>
                <h3>{weatherData.weather[0].main}</h3>
                <div className='temperature'>
                  <h3>{parseFloat(weatherData.main.temp - 273.15).toFixed(2)} &deg;C</h3>
                </div>
                <div className='loaction'>
                  <h3><i class='fa fa-street-view'></i>{weatherData.name} || {weatherData.sys.country}</h3>
                </div>
                <div className='other-details'>
                  <h6>Min : {parseFloat(weatherData.main.temp_min - 273.15).toFixed(2)} &deg;C || Max : {parseFloat(weatherData.main.temp_max - 273.15).toFixed(2)} &deg;C || Humidity : {weatherData.main.humidity}% </h6>
                </div>
              </div>
            ) : null}
          </>
        )
        }

      </div>
    </div >
  );
}

export default App;
