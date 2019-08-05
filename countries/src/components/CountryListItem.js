import React, { useState } from 'react';
import CountryInfo from './CountryInfo';

const CountryListItem = ({ country }) => {
  const [infoShown, setInfoShown] = useState(false);

  const handleShowInfo = () => {
    setInfoShown(!infoShown);
  };

  return (
    <li>
      <div>
        {country.name}{' '}
        <button onClick={handleShowInfo}>{infoShown ? 'hide' : 'show'}</button>
      </div>
      {infoShown && <CountryInfo country={country} />}
    </li>
  );
};

export default CountryListItem;
