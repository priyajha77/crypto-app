import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Coins from './Coins';

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [listOfCoins, setListOfCoins] = useState([]);

  useEffect(() => {
    const API_KEY = 'MOUDA6Qi4RfBWFMIic0JkUxEiRdH4ztiwOKJnvqMaBQ=';

    Axios.get("https://openapiv1.coinstats.app/coins", {
      headers: {
        'x-api-key': API_KEY
      }
    })
      .then(({data}) => {
        setListOfCoins(data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filtered = listOfCoins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchWord.toLowerCase())
  );
  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input
          type="text"
          value={searchWord}
          onChange={(event) => setSearchWord(event.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className='cryptoDisplay'>
        {filtered?.map((coin) =>
          <Coins key={coin.id} name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol} />
        )}
      </div>
    </div>
  );
}

export default App;
