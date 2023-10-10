import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "../context/context";

const TradingStyle = ({table, onClick, highlightedValue, tableValue}) => {
  return (
    <button onClick={onClick} >
      <div
        className = {`text-gray-500 uppercase ${  
          table === highlightedValue
          ? "text-yellow-500"
          : "hover:text-yellow-500"
        }`}
      >
        {tableValue}
      </div>
    </button>
  )
}

function Trading() {
    // change between table
    const [selectTable, setSelectTable] = useState(1);
    const [highlighted, setHighlighted] = useState(false);

    const clickEvent = (table_number) => {
      setSelectTable(table_number);
      setHighlighted(table_number);
    }

  // const [randomValues, setRandomValues] = useState([]);
  // useEffect(() => {
  //   generateRandomValues();
  // }, []);
  // A function to generate random values of cells in table
  // const generateRandomValues = () => {
  //   const newRandomValues = [];

  //   for (let i = 0; i < numRows; i++) {
  //     const rowValues = [];

  //     const randomPrice = parseFloat(
  //       (Math.random() * (26056.0 - 26050.0) + 26050.0).toFixed(2)
  //     );
  //     rowValues.push(randomPrice);

  //     const randomAmount = parseFloat(
  //       (Math.random() * (0.8 - 0.0) + 0.0).toFixed(5)
  //     );
  //     rowValues.push(randomAmount);

  //     // Function to generate a random time
  //     function generateRandomTime() {
  //       const hours = Math.floor(Math.random() * 24); // Generate random hours (0-23)
  //       const minutes = Math.floor(Math.random() * 60); // Generate random minutes (0-59)
  //       const seconds = Math.floor(Math.random() * 60); // Generate random seconds (0-59)

  //       const formattedTime = `${hours}:${padNumber(minutes)}:${padNumber(
  //         seconds
  //       )}`;
  //       return formattedTime;
  //     }

  //     // Function to pad a number with leading zeros (e.g., padNumber(5) => "05")
  //     function padNumber(num) {
  //       return num.toString().padStart(2, "0");
  //     }

  //     const randomTime = generateRandomTime();
  //     rowValues.push(randomTime);

  //     newRandomValues.push(rowValues);
  //   }

  //   setRandomValues(newRandomValues);
  // };

  const numRows = 20; // Number of rows

  return (
    <div>
      <div className=" ml-5 mt-3 pt-1 mb-1 containter">
        <div className="font-bold text-sm flex flex-row space-x-5">
          <TradingStyle
            value = {1}
            onClick={() => {
              clickEvent(1);
            }}
            highlightedValue={highlighted}
            tableValue = "Market Trade"
          >
          </TradingStyle>
          <TradingStyle
            value = {2}
            onClick={() => {
              clickEvent(2);
            }}
            highlightedValue={highlighted}
            tableValue = "My trade"
          ></TradingStyle>
        </div>
        
      </div>
      <TableComponent selectTable = {selectTable}></TableComponent>
    </div>
  );
}


const TableComponent = ({selectTable}) => {

  const url = "http://localhost:3002/api/data/mydata";

  const [data, setData] = useState([]);
  const {username} = useAuth();

  useEffect(() => {
    Axios.post(url, {username: username} )
      .then((response) => {
        setData(response.data)
        console.log(response.data)
    })
  }, [data])


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
                <th className="pt-2 m-3 text-sm">Price(USDT)</th>
                <th className="pt-2 m-3 text-sm ">Amount(BTC)</th>
                <th className="pt-2 m-3 text-sm">Time</th>
              </tr>
            </thead>
            <tbody className="text-left ml-3 text-black uppercase font-light">
             {
              data ? 
                data.map(
                  (val) => {
                    if(val !== null) {
                      
                    }
                  }
                )
                : null
             }
             
              {/* {randomValues.map((rowValues, rowIndex) => (
                <tr key={rowIndex}>
                  {rowValues.map((value, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={columnIndex == 2 ? "px-0" : "text-left"}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
    );
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
                {/* {randomValues.map((rowValues, rowIndex) => (
                  <tr key={rowIndex}>
                    {rowValues.map((value, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={columnIndex == 2 ? "px-0" : "text-left"}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))} */}

              </tbody>
            </table>
          </div>
      );
 }
 
}
export default Trading;
