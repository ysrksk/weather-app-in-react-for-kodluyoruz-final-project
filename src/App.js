import {  BrowserRouter,  Routes,  Route,} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

import {Login, Weather, WeatherDetails} from './pages'
import './styles/Main.scss'
import { WeatherProvider} from './context/WeatherContext';


function App() {
  if (localStorage.getItem('user')){
    return (
      <>
      <WeatherProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Weather/>}/>
            <Route index element={<Weather />} />
            <Route path="/:cityName" element={<ErrorBoundary><WeatherDetails/></ErrorBoundary>}/>
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
      </>
    )
  }

  return (
    <>
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
    </>
  )
}

export default App;
