import React from 'react'
import { Clock } from './Clock'
import { DegreesToDirection, Month, Weekday, Day } from '../../helpers/utils'

import clockIcon from '../images/clock.png'
import dropIcon from '../images/drop.png'
import windIcon from '../images/wind.png'

export const WeatherData = ({ data }) => {
    const { name, country, temp, description, temp_min, temp_max, icon, feels_like, speed, deg, humidity } = data;
  
    return (
      <>
        <header>
          <div>
            <img 
            src={clockIcon} 
            alt='time icon'
            />
            <Clock />
          </div>
          <h5>{Weekday}, {Month} {Day}</h5>
        </header>
        <main>
          <div className='weather-main'>
            <img 
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
            className='weather-icon'/>
            <div>
              <h2>{name}, {country}</h2>
              <h3 className='description'>{description}</h3>
            </div>
          </div>
          <div className='temp-main'>
            <h5>Feels like {feels_like} °</h5>
            <h1 className='temperature'>{temp}°</h1>
            <div className='hi-lo'>
              <h5>H {temp_max}°</h5>
              <h5>L {temp_min}°</h5>
            </div>
          </div>
        </main>
        <footer>
          <div className='weather-prop'>
            <img src={windIcon} alt='wind weather icon'/>
            <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
          </div>
          <div className='weather-prop'>
            <img src={dropIcon} alt='drop weather icon'/>
            <h4>{humidity} %</h4>
          </div>
        </footer>
      </>
    );
  }