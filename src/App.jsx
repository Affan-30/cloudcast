import React, { useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="header-section">
        <div className="search-container">
          <img src="/logo2.png" alt="CloudCast" className="logo"/>
          
          <div className="input-wrapper">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
              className="search-input"
            />
            <FaSearch
              className="search-icon"
              onClick={() => searchLocation({ key: "Enter" })}
            />
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="container">
          <div className="top">
            <div className="location">
              {data.name && data.sys ? (
                <p>{data.name}, {data.sys.country}</p>
              ) : null}
            </div>
            <div className="temp">
              {data.main ? <h1>{((data.main.temp.toFixed() - 32) * 5 / 9).toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined &&
            <div className="black">
              <div className="feels weather-item">
                <TiWeatherPartlySunny size={50} />
                {data.main ? <p className='bold'>{((data.main.temp.toFixed() - 32) * 5 / 9).toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity weather-item">
                <WiHumidity size={50} />
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind weather-item">
                <TiWeatherWindyCloudy size={50} />
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
              <div className="sunrise weather-item">
                <GiSunrise size={50} />
                {data.sys ? <p className='bold'>
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p> : null}
                <p>Sunrise</p>
              </div>

              <div className="sunset weather-item">
                <GiSunset size={50} />
                {data.sys ? <p className='bold'>
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p> : null}
                <p>Sunset</p>
              </div>
            </div>
          }
          <div className="social-container">
            <h4 className="social-title">affan.dev :</h4>

            <a
              href="https://github.com/Affan-30"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/affan3006"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com/_affan30_"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//CSS
