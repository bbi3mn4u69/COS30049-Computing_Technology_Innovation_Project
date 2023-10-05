import React, { useEffect, useState } from "react";

function Ordersell() {
  const [randomValues, setRandomValues] = useState([]);

  useEffect(() => {
    generateRandomValues();
  }, []);

  //A function to generate random values of cells in table
  const generateRandomValues = () => {
    const newRandomValues = [];

    for (let i = 0; i < numRows; i++) {
      const rowValues = [];
        
      const randomPrice = parseFloat(
          (Math.random() * (26056.0 - 26050.0) + 26050.0).toFixed(2)
      );
      rowValues.push(randomPrice);
      
      const randomAmount = parseFloat(
          (Math.random() * (0.8 - 0.0) + 0.0).toFixed(5)
      );
      rowValues.push(randomAmount);

      const total = (randomPrice * randomAmount).toFixed(5); // Calculate the product
      rowValues.push(total);

      newRandomValues.push(rowValues);
    }

    setRandomValues(newRandomValues);
  };

  const numRows = 20; // Number of rows

  return (
    <div>
      <div className="overflow-y-auto h-390 overflow-x-hidden">
        <table className="table-fixed m-2 w-full ml-5 pl-2" id="randomTable">
          <thead>
            <tr className="sticky top-0 text-sm text-gray-500 text-left bg-slate-200">
              <th className=" text-sm pt-2 m-3">price(USDT)</th>
              <th className=" text-sm pt-2 m-3">Amount</th>
              <th className=" text-sm pt-2 m-3">Total</th>
            </tr>
          </thead>
          <tbody className="text-left ml-3 text-gray-800 uppercase font-light text-sm">
            {randomValues.map((rowValues, rowIndex) => (
              <tr key={rowIndex}>
                {rowValues.map((value, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={
                      columnIndex === 0 ? "text-red-500 text-left" : columnIndex == 2 ? "px-0" : "text-left"
                    }
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Ordersell;
