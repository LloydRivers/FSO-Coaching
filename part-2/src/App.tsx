import axios from "axios";
import { Root } from "./types";
import { useState, useEffect } from "react";
const App = () => {
  const ALL_COUNTRIES = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const GET_BY_NAME = "https://studies.cs.helsinki.fi/restcountries/api/name";

  const [countries, setCountries] = useState<Root[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Root[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  }, []);

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
