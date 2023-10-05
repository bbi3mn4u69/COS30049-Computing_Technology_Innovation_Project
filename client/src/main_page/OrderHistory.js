import React, { useEffect, useState } from "react";

function OrderHistoryStyle({ order, onClick, highlightedOrder, orderValue }) {
  return (
    <button onClick={onClick}>
      <div
        className={`text-gray-500 ${
          order === highlightedOrder
            ? "text-yellow-500"
            : "hover:text-yellow-500"
        }`}
      >
        {orderValue}
      </div>
    </button>
  );
}

function OrderHistory() {
  // changed between the table 
  
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [highlighted, setHighlighted] = useState(false);
  const clickEvent = (order_number) => {
    setSelectedOrder(order_number);
    setHighlighted(order_number);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-6 items-center mx-3 p-2">
        <OrderHistoryStyle
          order={1}
          onClick={() => {
            clickEvent(1);
          }}
          highlightedOrder={highlighted}
          orderValue="Order History"
        />
        <OrderHistoryStyle
          order={2}
          onClick={() => {
            clickEvent(2);
          }}
          highlightedOrder={highlighted}
          orderValue="Fund"
        />
      </div>
      <div className="px-4">
        <OrderComponent selectedOrder={selectedOrder} />
      </div>
    </div>
  );
}

function OrderComponent({ selectedOrder }) {
  // hidden the account balance
  const[hidden, setHidden] = useState(true);
  const[hidden1, setHidden1] = useState(true)

// reserved for build backend.................................................
  // get the data from the storage
  let buy_data = JSON.parse(localStorage.getItem("buy_data") || []);

  let dataLength = buy_data.length;
  
  const [rowCount, setRowCount] = useState(0);
  const [dataindex, setDataIndex] = useState(0);
  // when the data length add one, the row add one
  useEffect(() => {
    setRowCount(dataLength);
    if (dataLength > 0 && dataindex >= 0 && dataindex < dataLength) {
      setDataIndex(dataLength - 1);
    }
  }, [dataLength]);
  console.log(dataLength);
  //.................................................
  switch (selectedOrder) {
    default:
      return (
        <div className="overflow-y-auto border h-40">
          <table className={" w-full text-xs font-semibold text-left overflow-y-auto"}>
            <thead className="sticky text-gray-500 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  order id
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-300">
                  pair
                </th>
                <th scope="col" className="px-6 py-3">
                  amount
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-300">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  total
                </th>
                {/* complete or not */}
                <th scope="col" className="px-6 py-3 bg-slate-300 ">
                  status
                </th>
                {/* buy or sell */}
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-300 ">
                  time
                </th>
                <th scope="col" className="px-6 py-3 ">
                  options
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b border-slate-300 text-sm font-semibold mx-2 text-black">
                <th
                  scope="row"
                  className="px-6 py-2 font-medium whitespace-nowrap"
                >
                  1
                </th>
                <td className="px-6 py-2 bg-slate-300 uppercase"> btc </td>
                <td className="px-6 py-2">0.2</td>
                <td className="px-6 py-2 bg-slate-300">
                  26054.02
                </td>
                <td className="px-6 py-2"> 5992.42(USDT) </td>
                <td className="px-6 py-2 bg-slate-300">
                  <span class="inline-flex items-center w-full bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Complete
                  </span>
                </td>
                <td className="px-6 py-2 uppercase text-green-500"> buy</td>
                <td className="px-6 py-2 bg-slate-300">12:53:28</td>
                <td className="px-6 py-2">
                  {/* remove button if user want to delete the transaction */}
                  <button class="flex flex-row items-center space-x-1 bg-red-400 px-2 py-1 rounded-lg hover:bg-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <div className="text-gray-100"> Remove </div>
                  </button>
                </td>
              </tr>
              <tr className=" border-b border-slate-300 text-sm font-semibold mx-2 text-black">
                <th
                  scope="row"
                  className="px-6 py-2 font-medium whitespace-nowrap"
                >
                  2
                </th>
                <td className="px-6 py-2 bg-slate-300 uppercase"> btc </td>
                <td className="px-6 py-2">0.45</td>
                <td className="px-6 py-2 bg-slate-300">
                  26054.02
                </td>
                <td className="px-6 py-2"> 7992.52(USDT) </td>
                <td className="px-6 py-2 bg-slate-300">
                  <span class="inline-flex items-center w-full bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    <span class="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                    In Process 
                  </span>
                </td>
                <td className="px-6 py-2 uppercase text-red-500"> Sell </td>
                <td className="px-6 py-2 bg-slate-300">12:53:30</td>
                <td className="px-6 py-2">
                  {/* remove button if user want to delete the transaction */}
                  <button class="flex flex-row items-center space-x-1 bg-red-400 px-2 py-1 rounded-lg hover:bg-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <div className="text-gray-100"> Remove </div>
                  </button>
                </td>
              </tr>
              <tr className=" border-b border-slate-300 text-sm font-semibold mx-2 text-black">
                <th
                  scope="row"
                  className="px-6 py-2 font-medium whitespace-nowrap"
                >
                  3
                </th>
                <td className="px-6 py-2 bg-slate-300 uppercase"> btc </td>
                <td className="px-6 py-2">0.2</td>
                <td className="px-6 py-2 bg-slate-300">
                  26054.02
                </td>
                <td className="px-6 py-2"> 5992.42(USDT) </td>
                <td className="px-6 py-2 bg-slate-300">
                  <span class="inline-flex items-center w-full bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Complete
                  </span>
                </td>
                <td className="px-6 py-2 uppercase text-green-500"> buy</td>
                <td className="px-6 py-2 bg-slate-300">12:53:28</td>
                <td className="px-6 py-2">
                  {/* remove button if user want to delete the transaction */}
                  <button class="flex flex-row items-center space-x-1 bg-red-400 px-2 py-1 rounded-lg hover:bg-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <div className="text-gray-100"> Remove </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    case 2:
      return (
        <div className="overflow-y-auto border h-40">
           <table className="w-full text-xs font-semibold text-left">
          <thead className="text-gray-500 uppercase sticky">
            <tr>
              <th scope="col" className="px-6 py-3 ">Wallet id</th>
              <th scope="col" className="px-6 py-3 bg-slate-300 ">Wallet Adress</th>
              <th scope="col" className="px-6 py-3">USD balance</th>
              <th scope="col" className="px-6 py-3 bg-slate-300 "> BTC balance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-300 text-sm font-semibold mx-2 text-black">
              <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">1</th>
              <td className="px-6 py-2 bg-slate-300"> 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71 </td>
              <button onClick={() => hidden ? setHidden(false) : setHidden(true
                )}>
                <td className="px-6 py-2">{ hidden ? "****************" : "$25,000,000" }</td>
              </button>

                <td className="px-6 py-2 bg-slate-300">
                  <button onClick={() => hidden1 ? setHidden1(false) : setHidden1(true
                )}>
                    <div>{ hidden1 ? "****************" : "15" }</div>
                  </button>
                </td>
            </tr>
            <tr className="border-b border-slate-300 text-sm font-semibold mx-2 text-black">
              <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">2</th>
              <td className="px-6 py-2 bg-slate-300"> 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71 </td>
              <button onClick={() => hidden ? setHidden(false) : setHidden(true
                )}>
                <td className="px-6 py-2">{ hidden ? "****************" : "$25,000,000" }</td>
              </button>

                <td className="px-6 py-2 bg-slate-300">
                  <button onClick={() => hidden1 ? setHidden1(false) : setHidden1(true
                )}>
                    <div>{ hidden1 ? "****************" : "15" }</div>
                  </button>
                </td>
            </tr>
            <tr className="border-b border-slate-300 text-sm font-semibold mx-2 text-black">
              <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">3</th>
              <td className="px-6 py-2 bg-slate-300"> 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71 </td>
              <button onClick={() => hidden ? setHidden(false) : setHidden(true
                )}>
                <td className="px-6 py-2">{ hidden ? "****************" : "$25,000,000" }</td>
              </button>

                <td className="px-6 py-2 bg-slate-300">
                  <button onClick={() => hidden1 ? setHidden1(false) : setHidden1(true
                )}>
                    <div>{ hidden1 ? "****************" : "15" }</div>
                  </button>
                </td>
            </tr>
            <tr className="border-b border-slate-300 text-sm font-semibold mx-2 text-black">
              <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">4</th>
              <td className="px-6 py-2 bg-slate-300"> 1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71 </td>
              <button onClick={() => hidden ? setHidden(false) : setHidden(true
                )}>
                <td className="px-6 py-2">{ hidden ? "****************" : "$25,000,000" }</td>
              </button>

                <td className="px-6 py-2 bg-slate-300">
                  <button onClick={() => hidden1 ? setHidden1(false) : setHidden1(true
                )}>
                    <div>{ hidden1 ? "****************" : "15" }</div>
                  </button>
                </td>
            </tr>
          </tbody>
        </table>
        </div>
       
      );
  }
}

export default OrderHistory;
