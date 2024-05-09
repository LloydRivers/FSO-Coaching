import axios from "axios";
import { Root } from "./types";
import { useState, useEffect } from "react";
import { IWeatherData } from "./weatherTypes";

const App = () => {
  const ALL_COUNTRIES = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [countries, setCountries] = useState<Root[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Root[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  const fetchWeather = async (lat = 0, lon = 0) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const filterData = (data: Root[], filter: string) => {
    return data.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFilter(inputValue);
    const data = filterData(countries, inputValue);

    if (data.length > 10) {
      setErrorMessage("Too many matches, specify another filter");
      setFilteredCountries([]);
      return;
    } else {
      setErrorMessage(null);
      setFilteredCountries(data);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(ALL_COUNTRIES);
      setCountries(data);
    } catch (error) {
      console.log("Error fetching data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    if (filteredCountries.length === 1) {
      const lat = filteredCountries[0].latlng[0];
      const lon = filteredCountries[0].latlng[1];
      fetchWeather(lat, lon);
    }
  }, [weatherData]);

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      {
        <div>
          {filteredCountries.length === 1 ? (
            <div>
              <h1>{filteredCountries[0].name.common}</h1>
              <p>capital {filteredCountries[0].capital[0]}</p>
              <p>population {filteredCountries[0].population}</p>
              <h2>languages</h2>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (language) => (
                    <li key={language}>{language}</li>
                  )
                )}
              </ul>
              <img
                src={filteredCountries[0].flags.png}
                alt={filteredCountries[0].name.common}
                width="100"
              />
              <h2>Weather in {filteredCountries[0].capital[0]}</h2>

              {weatherData ? (
                <div>
                  <h2>
                    temperature {(weatherData.main.temp - 273.15).toFixed(1)}{" "}
                    celcius{" "}
                  </h2>
                  <h2>wind {weatherData.wind.speed}m/s</h2>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          ) : filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => setFilteredCountries([country])}>
                  show
                </button>
              </div>
            ))
          ) : (
            <p>{errorMessage}</p>
          )}
        </div>
      }
    </div>
  );
};

export default App;
