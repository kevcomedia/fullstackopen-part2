import React from 'react';
import CountryListItem from './CountryListItem';

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <CountryListItem country={country} key={country.alpha2Code} />
        ))}
      </ul>
    );
  }
};

export default CountryList;
