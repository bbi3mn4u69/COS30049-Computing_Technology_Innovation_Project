import { useEffect, useState } from "react";

function Crypto( {data} ) {
  function filterData(data) {
    // Get today's date in the format "YYYY-MM-DD"
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.0000000Z';

    // Filter the data
    let filteredData = [];
    let pairs = new Set();
    for (let i = 0; i < data.length; i++) {
        if (data[i].date === today && !pairs.has(data[i].pair)) {
            filteredData.push(data[i]);
            pairs.add(data[i].pair);
        }
    }
    return filteredData;
  }
  const[selectedCoin, setSelectedcoin] = useState({})

  

  useEffect(() => {
    const filteredData = filterData(data);
    if (filteredData.length > 0) {
      setSelectedcoin(filteredData[0]);
    }
  }, [data]);
  


  // .....

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const delay = 5000; // 3 seconds

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

    if (!isVisible) {
      return null; // Render nothing if isVisible is false
    } else {
      return (
        <div
          className="md:flex md:flex-row md:mx-5 md:my-2 md:justify-between md:w-auto
        flex flex-row my-2 justify-evenly"
        >
          <div
            className="md:flex md:flex-row md:items-center md:border-r md:border-slate-400
          flex flex-row items-center border-r border-slate-400 mr-3"
          >
            <div className="text-black block uppercase text-xl font-semibold pr-2">
              ETH/usdt
            </div>
            <div className="text-black block text-xs font-light underline underline-offset-2 pr-2">
              <a href="https://www.binance.com/en-AU/price/ethereum" target="_blank">
              Ethereum Price
              </a>
            
            </div>
          </div>
          <div
            className="md:flex md:flex-col
          flex flex-col"
          >
            {/* current price of that crypto */}
            <div className={`${selectedCoin.changeClass} text-left`}>{selectedCoin.close}</div>
            {/* current price of that crypto */}
            <div className="text-black block text-left">{selectedCoin.open}</div>
          </div>
          <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
            {/* 24h change */}
            <div className="text-neutral-400 block text-xs font-bold text-left">
              24h Change
            </div>
            <div className={`${selectedCoin.changeClass} block text-left`}>{selectedCoin.change} {selectedCoin.change_percent}</div>
          </div>
          <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
            {/* 24h high */}
            <div className="text-neutral-400 block text-left text-xs font-bold ">
              24h High
            </div>
            <div className="text-black block text-left">{selectedCoin.high_24}</div>
          </div>
          <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
            {/* 24h Low */}
            <div className="text-neutral-400 block text-left text-xs font-bold ">
              24h Low
            </div>
            <div className="text-black block text-left">{selectedCoin.low_24}</div>
          </div>
          <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
            {/* 24h Volume (ETH) */}
            <div className="text-neutral-400 block text-left text-xs font-bold ">
              24h Volume(ETH)
            </div>
            <div className="text-black block text-left ">{selectedCoin.vol_24}</div>
          </div>
        </div>
      ); 
    }
    
}
export default Crypto;