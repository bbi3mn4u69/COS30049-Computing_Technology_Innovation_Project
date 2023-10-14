import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "../context/context";

const TradingStyle = ({ table, onClick, highlightedValue, tableValue }) => {
  return (
    <button onClick={onClick}>
      <div
        className={`text-gray-500 uppercase ${
          table === highlightedValue
            ? "text-yellow-500"
            : "hover:text-yellow-500"
        }`}
      >
        {tableValue}
      </div>
    </button>
  );
};

function Trading() {
  // change between table
  const [selectTable, setSelectTable] = useState(1);
  const [highlighted, setHighlighted] = useState(false);

  const clickEvent = (table_number) => {
    setSelectTable(table_number);
    setHighlighted(table_number);
  };


  

  const numRows = 20; // Number of rows

  return (
    <div>
      <div className=" ml-5 mt-3 pt-1 mb-1 containter">
        <div className="font-bold text-sm flex flex-row space-x-5">
          <TradingStyle
            table={1}
            onClick={() => {
              clickEvent(1);
            }}
            highlightedValue={highlighted}
            tableValue="Market Trade"
          ></TradingStyle>
          <TradingStyle
            table={2}
            onClick={() => {
              clickEvent(2);
            }}
            highlightedValue={highlighted}
            tableValue="My trade"
          ></TradingStyle>
        </div>
      </div>
      <TableComponent selectTable={selectTable}></TableComponent>
    </div>
  );
}

const TableComponent = ({ selectTable }) => {
  const url = "http://localhost:3002/api/usertrade/data";

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const { username } = useAuth();


  useEffect(() => {
    const fetchData = async () => {

      const url2 = 'https://rest.coinapi.io/v1/trades/BITSTAMP_SPOT_ETH_USD/history?time_start=2023-09-14T00:00:00';
      const headers = {'X-CoinAPI-Key': '75EB34BD-EF41-4F29-9340-D309DFF1240A'};

      const response = await fetch(url2, {method: "GET", headers: headers});
      const json = await response.json();
      setData2(json)
    };
  
    fetchData();
  }, []); 

  console.log(data2)

  switch (selectTable) {

    default:
      return (
        <div className="overflow-y-auto h-300 overflow-x-hidden grid grid-cols-12">
          <table
            className="table-fixed w-full ml-5 col-start-2 col-span-11"
            id="randomTable"
          >
            <thead>
              <tr className="sticky top-0 text-black text-left bg-slate-200">
                <th className="pt-2 m-3 text-sm">Price(USD)</th>
                <th className="pt-2 m-3 text-sm ">Amount(ETH)</th>
                <th className="pt-2 m-3 text-sm">Time</th>
              </tr>
            </thead>
            <tbody className="text-left ml-3 uppercase font-light">
              {
                data2 ?
                data2.map((i) => {
                  return (
                    <tr className="px-0 text-left text-black">
                      <th>
                        {i.price}
                      </th>
                      <td>
                        {i.size}
                      </td>
                      <td>
                        {i.time_exchange}
                      </td>
                    </tr>
                  );
                }) :
                null
              }
            </tbody>
          </table>
        </div>
      );
    /*
    case 2:
      return (
        <div className="overflow-y-auto h-300 overflow-x-hidden grid grid-cols-12">
          <table
            className="table-fixed w-full ml-5 col-start-2 col-span-11"
            id="randomTable"
          >
            <thead>
              <tr className="sticky top-0 text-black text-left bg-slate-200">
                <th className="pt-2 m-3 text-sm">Price(USDT)</th>
                <th className="pt-2 m-3 text-sm ">Amount(BTC)</th>
                <th className="pt-2 m-3 text-sm">Time</th>
              </tr>
            </thead>
            <tbody className="text-left ml-3 text-black uppercase font-light">
              <tr className="px-0 text-left">
                <td>
                  
                </td>
                <td>
                  
                </td>
                <td>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );*/
  }
};
export default Trading;
