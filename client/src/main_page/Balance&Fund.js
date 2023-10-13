import React, { useState, useEffect } from "react";
import web3 from "../shared_component/web3";

function BalanceAndFund() {
  
  const [balanceEther, setBalanceInEther] = useState(null); // Initialize with null

  //render the ETH account balance to front-end
  const init = async () => {
    try {
      const addresses = await web3.eth.getAccounts();
      const balanceInWei = await web3.eth.getBalance(addresses[0]); //get balance from account
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      setBalanceInEther(balanceInEther); //set the obtained balance value to balanceEther variable to render
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };


  useEffect(() => {
    init()
    console.log(balanceEther)
  }, [balanceEther]);


  return (
    <div className="md:grid md:grid-cols-12 md:gap-10 md:mx-10 flex flex-row justify-center ">
      <div className="flex flex-row space-x-1 mx-3 col-start-2  md:col-span-4 col-span-8 lg:col-span-6">
        <div className="text-yellow font-bold text-sm">Account balance:</div>
        {balanceEther !== null ? ( // Conditionally render when balanceInEther is not null
          <div className="text-black font-bold text-sm" id="balance">
            {balanceEther} ETH
          </div>
        ) : (
          <div className="text-black font-thin text-sm" >Loading...</div>
        )}
      </div>
    </div>
  );
}

export default BalanceAndFund;
