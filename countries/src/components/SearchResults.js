import React from 'react';
import CountryList from './CountryList';
import CountryInfo from './CountryInfo';

const SearchResults = ({ filterString, countries }) => {
  const matchingCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterString.toLowerCase()),
  );

  if (filterString.length === 0) {
    return null;
  }

  if (matchingCountries.length > 1) {
    return <CountryList countries={matchingCountries} />;
  } else if (matchingCountries.length > 0) {
    const matchingCountry = matchingCountries[0];
    return <CountryInfo country={matchingCountry} />;
  } else {
    return <p>No matches</p>;
  }
};

export default SearchResults;
