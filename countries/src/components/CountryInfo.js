import React from 'react';
import WeatherInfo from './WeatherInfo';

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>
        <b>Capital:</b> {country.capital}
      </p>
      <p>
        <b>Population:</b> {country.population}
      </p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        style={{ maxWidth: 200, height: 'auto' }}
      />
      <WeatherInfo
        location={country.capital}
        countryCode={country.alpha2Code}
      />
    </>
  );
};

export default CountryInfo;
