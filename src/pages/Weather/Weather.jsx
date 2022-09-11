import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";

import { getWeatherForecastByCityName } from "../../services/Api.jsx"
import '../Weather/Weather.scss'
import WeatherContext from "../../context/WeatherContext.jsx";
import { getWeatherForecastByCityNameForLocalStorage } from "../../services/Api.jsx";

const Weather = (props) => {
    const [city, setCity] = useState({});
    const navigate = useNavigate();
    const {citiesInLocalStorage, setCitiesLocalStorage} = useContext(WeatherContext);
    const [localStoragedCities, setLocalStoragedCities] = useState([]); 

    const getCity = (e) => {
        setCity(e.target.value)
    }

    const fetchWeather = async (e) => {
        e.preventDefault();
        try {
            const cityName = city
            const res = await getWeatherForecastByCityName(cityName);
            if (res.status === 200) {
                setCity(res.data)
            }

            cityAddToLocalStorage();

            const obj = JSON.parse(localStorage.getItem("cities"));  
            const newArray = [];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            
            for (let i = 0; i < obj.length; i++) {
              const element = obj[i];
              const res = await getWeatherForecastByCityNameForLocalStorage(element);
              const dataIcon = res.data.weather[0].icon
              const dataId = res.data.id;
              const dataName = res.data.name;
              const dataSpeed = res.data.wind.speed;
              const dataCountry = res.data.sys.country;
              const dataCloud = res.data.weather[0].main;
              const dataTemp = res.data.main.temp.toFixed(0);
              const d = new Date();
              let date = days[d.getDay()];
              const data = `${dataId},${dataName},${dataCountry},${dataTemp},${dataCloud},${dataSpeed},${dataIcon},${date}`
              const myArray = data.split(",");
              newArray.push(myArray);
            } 

        setLocalStoragedCities(newArray);

            // props.setLoading(false)
        } catch (error) {
          console.log(error);
        }
    };
    
    const getLocalStorageData = async () => {
        const obj = JSON.parse(localStorage.getItem("cities"));  
        const newArray = [];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for (let i = 0; i < obj.length; i++) {
          const element = obj[i];
          const res = await getWeatherForecastByCityNameForLocalStorage(element);
          const dataIcon = res.data.weather[0].icon
          const dataId = res.data.id;
          const dataName = res.data.name;
          const dataSpeed = res.data.wind.speed;
          const dataCountry = res.data.sys.country;
          const dataCloud = res.data.weather[0].main;
          const dataTemp = res.data.main.temp.toFixed(0);
          const d = new Date();
          let date = days[d.getDay()];
          const data = `${dataId},${dataName},${dataCountry},${dataTemp},${dataCloud},${dataSpeed},${dataIcon},${date}`
          const myArray = data.split(",");
          newArray.push(myArray);
        } 
        setLocalStoragedCities(newArray);
    }   

    useEffect(() =>{
      if(localStorage.getItem("cities")){
        getLocalStorageData()
      };
    }, [])

    const goDetailPage = (city) => {
        navigate(`./${city.name}`);
    }

    const goDetailPage1 = (event) => {
      navigate(`./${event}`);
    }
  
    const cityAddToLocalStorage =  () => {
      if (citiesInLocalStorage.length < 3) {
        const newData = [
          ...citiesInLocalStorage,
          city
        ]
        setCitiesLocalStorage(newData);
        localStorage.setItem('cities', JSON.stringify(newData));
      } 

      if(citiesInLocalStorage.length === 3) {
        const newData = [
          ...citiesInLocalStorage,
          city
        ]
        setCitiesLocalStorage(newData);
        localStorage.setItem('cities', JSON.stringify(newData));
        const obj = JSON.parse(localStorage.getItem('cities'));
        obj.shift();
        setCitiesLocalStorage(obj);
        localStorage.setItem('cities', JSON.stringify(obj));
      }
    }

    return(
      <>
        <section>          
        <div className="weather-page-container">
          <div className="weather-search">
            <div className="weather-search-list">
              <form className="weather-form"> 
                  <input className="weather-search-input" type="text" autoComplete="on" onChange={getCity} placeholder="Please write a location.."/>
                  <button className="weather-search-btn" type="button" onClick={fetchWeather}>Search</button>
              </form>
            </div>
            <div className="weather-search-content">
                <p>{city?.weather && city.name}</p>
                <p>{city?.weather && city.sys.country}</p>
            </div>
            {city?.weather &&
            <>
            <div className="weather-search-btn2">
              <button  type="button" onClick={() => goDetailPage(city)} >See Details</button>
            </div>
            </>
            }
          </div>
          {city?.weather && (
            <div className="weather-container">
              <div className="weather-widget">
                <div className="weather-details">
                  <div className="weather-temperature">{city.main.temp.toFixed(0)}°C</div>
                  <div className="weather-summary">
                    <p className="weather-summaryText">{city?.weather[0]?.description }</p>
                  </div>
                    <div className="weather-precipitation">Humidity: {city.main.humidity}%</div>
                    <div className="weather-wind">Wind: {city.wind.speed}</div>
                </div>
                <div className="weather-pictoBackdrop">
                  <img className="weather-pictoFrame"
                    src={`https://openweathermap.org/img/wn/${city?.weather[0]?.icon}@2x.png`} alt="icon"/>
                </div>
              </div>
           </div>)}
        </div>
        </section>
        {localStorage.getItem("cities") &&
        <hr className="weather-hr"/>
        }
        <section>
          <div className="weather-localStoragePage">
            {localStoragedCities.map(data =>(
              <article className="weather-localStorePage-widget" key={data[0]} onClick={() => goDetailPage1(data[1])}>
                <div className="weather-localStorePage-weatherIcon">
                  <img className="weather-localStorePage-Icon" src={`https://openweathermap.org/img/wn/${data[6]}@2x.png`} alt="icon"/>
                </div>
                <div className="weather-localStorePage-weatherInfo">
                  <div className="weather-localStorePage-temperature"><span>{data[3]}&deg;</span></div>
                  <div className="weather-localStorePage-description">    
                    <div className="weather-localStorePage-weatherCondition">{data[4]}</div>    
                    <div className="weather-localStorePage-place" >{data[1]}, {data[2]} </div> 
                  </div>
                </div>
                <div className="weather-localStorePage-date">{data[7]}</div>
              </article>
              ))}
          </div>
        </section>

      </>            
    )
};

export default Weather;