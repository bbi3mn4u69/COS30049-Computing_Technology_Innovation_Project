import { React, useState } from "react";
import  Axios  from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/context";

function SellZone() {
const [empty, setEmpty] = useState("")
const url = "http://localhost:3002/api/usertrade";
const [sellPrice, setSellPrice] = useState("");
const {username, setUserName} = useAuth();
const [sellAmount, setSellAmount] = useState("");
const tradeType = "SELL";

const buttonHandle = () => {
  if (sellPrice !== null && sellAmount !== null) {
    Axios.post(url, {Price: sellPrice, Amount: sellAmount, tradeType: tradeType, username: username})
    .then((response) => {
      if (response.data.success === true) {
        toast.success('order place successful!', {
          position: 'top-right',
          autoClose: 3000,
        })
      }else {
        toast.success('order has fail!', {
          position: 'top-right',
          autoClose: 3000,
        })
      }
    })
    setEmpty("")
  }
}

  return (
    <div className="md:p-0 md:m-0 col-span-4 sm:col-span-6 ">
      {/* amount */}
      <div className="my-3">
        {/* <div className="text-white font-bold text-3xl uppercase">amount</div> */}
        <div>
          <input
            onChange={(e) => {setSellAmount(e.target.value)}}
            // value={empty}
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
            onChange={(e) => {setSellPrice(e.target.value)}}
            // value={empty}
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
