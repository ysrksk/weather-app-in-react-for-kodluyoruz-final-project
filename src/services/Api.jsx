import axios from "axios";

export const getWeatherForecastByCityName = (cityName) => {
    const apiKey = "15cfa73c4e39d34abc10e50fcc76bb42"
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
}

export const getWeatherForecastByCityNameWithDetails = (cityName) => {
    const apiKey = "15cfa73c4e39d34abc10e50fcc76bb42"
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
}

export const getWeatherForecastByCityNameForLocalStorage = (cityName) => {
    const apiKey = "15cfa73c4e39d34abc10e50fcc76bb42"
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
}