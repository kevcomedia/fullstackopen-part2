import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from './components/SearchResults';

function App() {
  const [countryInput, setCountryInput] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountryInputChange = (event) => {
    setCountryInput(event.target.value);
  };

  return (
    <div>
      <div>
        find countries:{' '}
        <input value={countryInput} onChange={handleCountryInputChange} />
      </div>
      <SearchResults filterString={countryInput} countries={countries} />
    </div>
  );
}

export default App;
