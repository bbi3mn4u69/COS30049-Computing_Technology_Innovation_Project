import React, { useState, useEffect } from "react";
import Axios  from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/context";
import web3 from "../shared_component/web3";
import contract_properties from "./contract_properties.json";

function BuyZone() {
  const url = "http://localhost:3002/api/usertrade";
  const [empty, setEmpty] = useState("");
  const username = localStorage.getItem("username")
  const [buyPrice, setBuyPrice] = useState ("");
  const [buyAmount, setBuyAmount] = useState ("");
  const tradeType = "BUY";

  const Smart_contract = async () => {
    const contractAddress = '0x0092162D5a4568eC32dA3Ad6760b86d25C6605f8';
    // Create a contract instance
    const contract = new web3.eth.Contract(contract_properties.abi, contractAddress);
    console.log(contract_properties)
    console.log(contract);
    const addresses = await web3.eth.getAccounts();

    //call methods from smart contract to add users and transactions information to the blockchain, then buy crypto to the account
    try {
      await contract.methods.addUser(username).send({
        from: addresses[0],
        gasLimit: 999999
      });
      await contract.methods.addTransact(buyPrice, buyAmount, tradeType).send({
        from: addresses[0],
        gasLimit: 999999
      });
      await contract.methods.buyToken().send({
        from: addresses[1],
        to: addresses[0],
        value: web3.utils.toWei(buyAmount.toString(), 'ether'),
        gasLimit: 999999
      });
    } catch(error) {
      console.error("Smart contract method call failed:", error);
    }
  }


  const buttonHandle = () => {
    if (buyPrice !== null && buyAmount !== null) {
      Axios.post(url, {Price: buyPrice, Amount: buyAmount, tradeType:tradeType, username: username}).
      then((response) => {
        if (response.data.success === true) {
          toast.success('order place successful!', {
            position: 'top-right',
            autoClose: 3000,
          });
          //initiate smart contract operation (only when order successful)
          Smart_contract()
        }else {
          toast.success('order has fail!', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      console.log(username);
      setEmpty("")
    }
  }


  return (
    <div className="md:p-0 md:m-0 col-span-4 sm:col-span-6">
      {/* amount */}
      <div className="my-3">
        <div>
          <input
            required 
            onChange={(e) => {setBuyAmount(e.target.value)}}
            // value={empty}
            name="amount"
            type="number"
            pattern="[0-9]"
            className="block w-full text-xs p-2 mr-3 text-black border border-slate-300 rounded bg-slate-300 sm:text-xs hover:border-yellow-600 focus:border-yellow-600 outline-none
  placeholder:text-gray-500 placeholder:text-xl placeholder:text-right placeholder:uppercase placeholder:font-light"
            placeholder="eth"
          ></input>
        </div>
      </div>
      {/* price */}
      <div className="my-3">
        {/* <div className="text-white font-bold text-3xl uppercase">price</div> */}
        <div>
          <input
            required
            onChange={(e) => { setBuyPrice(e.target.value)}}
            // value={empty}
            name="price"
            type="number"
            pattern="[0-9]"
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
          className="w-full mr-5 mb-3 h-11 text-white bg-green-700 text-center hover:bg-green-900 font-semibold 
        rounded-lg text-xl px-5 py-2.5 uppercase"
        >
          buy
        </button>
      </div>
    </div>
  );
}

export default BuyZone;
