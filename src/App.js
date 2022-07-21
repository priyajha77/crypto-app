import React from 'react';
import './App.css';
import Axios from 'axios';
import Coins from './Coins';

function App() {
  const [searchWord, setSearchWord] = React.useState("");
  const [listOfCoins, setListOfCoins] = React.useState([]);
  // function submitData()
  // {
  //   Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=10", {params:{query:{enteredData}}})
  //   .then(function(output){
  //     var myArr = output.data.results;
  //   })
  // }
  // https://api.coinstats.app/public/v1/coins?skip=0&limit=10
  React.useEffect(
    ()=>{
      Axios.get("https://api.coinstats.app/public/v1/coins?skip=0")
      .then((response)=>{
        setListOfCoins(response.data.coins)
      })
    }
    ,[])

    const filtered = listOfCoins.filter((coin)=>
    {
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
    })

  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input type="text" onChange={(event)=>{setSearchWord(event.target.value)}} placeholder="Bitcoin..."/>
        {/* <button type='submit' >Submit</button> */}
      </div>
      <div className='cryptoDisplay'>
        {/* {myArr} */}
        {filtered.map(function(coin)
        {
          return <Coins name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol}/>
        })}
      </div>
    </div>
  );
}

export default App;
