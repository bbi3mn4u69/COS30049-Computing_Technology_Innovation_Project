import BuyArea from "./Buyzone";
import SellArea from "./Sellzone";
import GraphArea from "./Visualization/container/Graphzone";
import MultiFunction from "./Multifunction";
import BalanceAndFund from "./Balance&Fund";
import ListOfCrypto from "./ListOfCrypto";
import TradingSection from "./trading";
import Coininfor from "./Crypto";
import OrderHistory from "./OrderHistory";
import { useAuth } from "../context/context";

import React from 'react';
import pLimit from 'p-limit';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = async (crypto, header) => {
    var url = `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${crypto}_USD/history?period_id=1DAY&time_start=2023-08-15T00:00:00`;
    var headers = {'X-CoinAPI-Key': header};
  
    const response = await fetch(url, {method: "GET", headers: headers});
    const json = await response.json();
      
    let newData = json.map((item, index) => {
      if (index === 0) return; // skip the first item
  
      const date = item.time_period_start;
  
      const close_yest = json[index - 1].price_close;
      const high_yest = json[index - 1].price_high;
      const low_yest = json[index - 1].price_low;
      const open_yest = json[index - 1].price_open;
      const vol_yest = json[index - 1].volume_traded;
  
     
      const close = item.price_close;
      const high = item.price_high;
      const low = item.price_low;
      const open = item.price_open;
      const vol = item.volume_traded;
  
      const high_24 = Math.max(high_yest, high);
      const close_24 = Math.max(close_yest, close);
      const low_24 = Math.min(low_yest, low);
      const open_24 = Math.min(open_yest, open);
      const vol_24 = vol + vol_yest;
  
      let change_percent = ((close - close_yest) / close_yest) * 100;
      change_percent = Math.round(change_percent * 100) / 100;
  
      const change = close - close_yest;
  
      return {
        pair: crypto,
        date: date,
        close: `$${close}`,
        high: `$${high}`,
        open: `$${open}`,
        low: `$${low}`,
        vol: `${vol}`,
        close_yest: `$${close_yest}`,
        high_yest: `$${high_yest}`,
        open_yest: `$${open_yest}`,
        low_yest: `$${low_yest}`,
        vol_yest: `${vol_yest}`,
        close_24: `$${close_24}`,
        high_24: `$${high_24}`,
        open_24: `$${open_24}`,
        low_24: `$${low_24}`,
        vol_24: `${vol_24}`,
        change: `$${change}`,
        change_percent: `${change_percent}%`,
        changeClass: change_percent < 0 ? 'text-red-500' : 'text-green-500'
      };
    });

    // remove the first undefined element
    newData.shift();
  
    return newData;
  };
  
  componentDidMount() {
    const cryptos = ['ETH'];
    const headers = ['D87B93FB-B63D-4906-A4DC-0807B835DA89'];

    const requests = cryptos.map((crypto, index) => this.fetchData(crypto, headers[index]));

    Promise.all(requests)
      .then((newData) => {
        if(newData !== null) {
          this.setState({ data: newData.flat() }); // flatten the array of arrays
          console.log(this.state.data)
        } 
       
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="bg-slate-200 ">
        {/* divide by 12 cols */}
        <div
          className="md:grid md:grid-cols-12 md:grid-flow-row md:gap-1
        grid grid-cols-3 overflow-x-hidden gap-1 
        "
        >
         
          {/* current coin */}
          <div
            className="md:row-start-1 md:row-span-1 md:mt-1 md:h-15 md:col-start-1 md:col-end-10 md:border-slate-300 md:rounded md:border 
          row-start-1 col-start-1 col-end-4 row-span-1
          "
          >
            {/* crypto currentcy and the information about that crypto */}
            <Coininfor data={this.state.data}></Coininfor>
          </div>
  
          {/* list of crypto */}
          <ListOfCrypto data={this.state.data}></ListOfCrypto>
          {/* trading */}
          <div
            className="md:mt-1 md:row-start-4 md:row-span-3 md:rounded md:col-start-1 md:col-end-4 md:border md:border-slate-300 md:block 
          hidden
          "
          >
            <TradingSection></TradingSection>
          </div>
  
          <div
            className="md:row-start-2 md:row-span-3 md:col-start-4 md:col-end-13 md:bg-slate-100 h-500
          row-start-2 row-span-1 col-end-4 col-start-1 bg-white z-2 
          "
          >
            {/* graph area */}
            <GraphArea data={this.state.data}></GraphArea>
          </div>
  
          {/* buy & sell area */}
          <div
            className="md:row-start-5 md:row-span-2 md:col-start-4 md:col-end-13 md:border md:rounded md:bg-slate-200 md:border-slate-300 
          row-start-3 row-end-6 col-start-1 col-span-3 bg-slate-200
          "
          >
            {/* MULTIFUNCTION */}
            <MultiFunction></MultiFunction>
  
            {/* balance and fund */}
            <BalanceAndFund></BalanceAndFund>
  
            <div className="sm:grid sm:p-0  col-end-8 sm:px-28 sm:grid-cols-12 sm:gap-10 sm:mx-3 lg:mx-10 flex flex-col p-5 m-0">
              {/* buy zone */}
              <BuyArea></BuyArea>
              {/* sell zone */}
              <SellArea></SellArea>
            </div>
          </div>
          {/* order history */}
          <div
            className="md:bg-slate-200 border h-52 md:rounded border-slate-300 md:row-start-7 md:row-span-1 md:col-start-1 md:col-end-13 md:block
          row-start-6 row-span-1 col-start-1 col-end-4 
          "
          >
            <OrderHistory></OrderHistory>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
