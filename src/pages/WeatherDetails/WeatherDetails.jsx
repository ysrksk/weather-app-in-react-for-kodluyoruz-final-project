import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getWeatherForecastByCityNameWithDetails } from "../../services/Api.jsx"
import '../WeatherDetails/WeatherDetails.scss'
import withLoading from '../../hoc/withLoading.jsx';


const WeatherDetails = (props) => {
    const {cityName} = useParams();
    const [city, setCity] = useState({});
    const [detay, setDetay] = useState([]);
    const [dayly, setDayly] = useState({});

    const fetchWeatherDetails = async () => {
        try {
            const res = await getWeatherForecastByCityNameWithDetails(cityName);
            if (res.status === 200) {
                const result = res.data.list.filter(data => data.dt_txt.includes("06:00:00"));            
                setDayly(res.data.list[0])
                setCity(res.data);
                setDetay(result);
            }
            props.setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };

    useEffect( () => {
        fetchWeatherDetails();
    }, [])

    return(
        <> 
        {dayly?.weather && (       
        <div className="container">           
            <div className="info-side">
                <div className="today-info-container">
                    <div className="today-info">
                        <div className="precipitation"> <span className="title">PRECIPITATION</span><span className="value">{dayly?.weather[0]?.description}</span>
                        <div className="clear"></div>
                        </div>
                        <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{dayly?.main?.humidity} %</span>
                        <div className="clear"></div>
                        </div>
                        <div className="wind"> <span className="title">WIND</span><span className="value">{dayly?.wind?.speed} km/h</span>
                        </div>
                    </div>
                </div>
                <div className="week-container">
                <ul className="week-list">
                    {detay.map(weather =>(
                        <div className="active" key={weather?.dt}>
                            <span className="dayname">{moment(weather?.dt_txt).format('dddd')}</span>
                            <span className="dayname">{moment(weather?.dt_txt).format('l')}</span>
                            <span className="day-temp">{weather?.main.temp.toFixed(0)}°C</span>
                            <span className="day-icon" data-feather="sun">{weather?.weather[0]?.main}</span>
                        </div>
                    ))}
                </ul>
                </div>
            </div>
            <div className="weather-side">
                <div className="weather-gradient"></div>
                <div className="date-container">
                <h2 className="date-dayname">{city?.city?.name}</h2>
                <span className="date-day">{moment(dayly?.dt_txt).format("LL")}</span>
                <span className="date-day">{moment(dayly?.dt_txt).format("dddd")}</span>
                <i className="location-icon" data-feather="map-pin">{city?.city?.country}</i>
                <span className="location"></span>
                </div>
                <div className="weather-container2"><i className="weather-icon" data-feather="sun"></i>
                <h1 className="weather-temp">{dayly?.main.temp_min.toFixed(0)}°C - {dayly?.main.temp_max.toFixed(0)}°C</h1>
                <h3 className="weather-desc">Fells : {dayly?.main.feels_like.toFixed(0)}°C</h3>
                <h3 className="weather-desc">{dayly?.weather[0]?.main}</h3>
                </div>
            </div>
        </div>)}
        </>
    )
};

export default withLoading(WeatherDetails);