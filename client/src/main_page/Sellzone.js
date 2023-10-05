import { React, useState } from "react";

function SellZone() {

   // reserved for build backend.................................................
   const [inputArr, setInputArr] = useState([]);
   const [inputData, setInputData] = useState({
     amount: [],
     price: [],
   });
   function changeHandle(e) {
     setInputData({ ...inputData, [e.target.name]: e.target.value });
   }
 
   let { amount, price } = inputData;
   
   function buttonHandle() {
     if (inputData.amount != "" && inputData.price != "" ) {
       setInputArr([...inputArr, { amount, price }]);
     }
     // clear input data after inputed
     inputData.amount = "";
     inputData.price = "";
 
   }
   
   localStorage.setItem("sell_data", JSON.stringify(inputArr));
   // .................................................
  return (
    <div className="md:p-0 md:m-0 col-span-4 sm:col-span-6 ">
      {/* amount */}
      <div className="my-3">
        {/* <div className="text-white font-bold text-3xl uppercase">amount</div> */}
        <div>
          <input
            onChange={changeHandle}
            value={inputData.amount}
            name="amount"
            type="number"
            pattern="[0-9]*"
            className="block w-full text-xs p-2 mr-3 text-black border border-slate-300 rounded bg-slate-300 sm:text-xs hover:border-yellow-600 focus:border-yellow-600 outline-none
  placeholder:text-gray-500 placeholder:text-xl placeholder:text-right placeholder:uppercase placeholder:font-light"
            placeholder="btc"
          ></input>
        </div>
      </div>
      {/* price */}
      <div className="my-3">
        {/* <div className="text-white font-bold text-3xl uppercase">price</div> */}
        <div>
          <input
            onChange={changeHandle}
            value={inputData.price}
            name="price"
            type="number"
            pattern="[0-9]*"
            className="block w-full text-xs p-2 mr-3 text-black border border-slate-300 rounded bg-slate-300 sm:text-xs hover:border-yellow-600 focus:border-yellow-600 outline-none
          placeholder:text-gray-500 placeholder:text-xl placeholder:text-right placeholder:uppercase placeholder:font-light"
            placeholder="usd"
          ></input>
        </div>
      </div>
      {/* sell button */}
      <div className="my-3">
        <button
          onClick={buttonHandle}
          type="button"
          className="w-full mr-5 mb-3 h-11 text-white bg-red-700 text-center hover:bg-red-900 font-semibold 
        rounded-lg text-xl px-5 py-2.5 dark:bg-red-700 dark:hover:bg-red-900 uppercase"
        >
          sell
        </button>
      </div>
    </div>
  );
}
export default SellZone;
