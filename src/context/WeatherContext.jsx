import React, { useState, createContext } from "react";

const WeatherContext = createContext(); // general state

export const WeatherProvider = ({ children }) => {
  let defaultValue = [];
  if (localStorage.getItem('cities')) {
    defaultValue = JSON.parse(localStorage.getItem('cities'));
  }

  const [citiesInLocalStorage, setCitiesLocalStorage] = useState(defaultValue);
  const [getUser, setGetUser] = useState("");

  const value = {
    citiesInLocalStorage,
    setCitiesLocalStorage,
    getUser,
    setGetUser  
  };
  
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;