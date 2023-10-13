
import Axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import { toast } from 'react-toastify';
import { ethers } from "ethers";
import web3 from "../shared_component/web3";

const FundTable = () => {


  const [balanceEther, setBalanceInEther] = useState(null); // Initialize with null

  //render the ETH account balance to front-end (fund table)
  const init = async () => {
    try {
      const addresses = await web3.eth.getAccounts();
      const balanceInWei = await web3.eth.getBalance(addresses[0]);
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      setBalanceInEther(balanceInEther);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    init()
    console.log(balanceEther)
  }, [balanceEther]);


    // table fund
  const { username } = useAuth();
  
  const url = "http://localhost:3002/api/user/fund"
  const [data, setData] = useState([])
  

  const requestWallet = () => {
   
    console.log("function running")
    Axios.post(url, {username: username}).
    then((response) => {
        setData(response.data)
    })
  }

  useEffect(() => {
    requestWallet()
  },[data])

  return (
    <div className="overflow-y-auto border h-40">
    <table className="w-full text-xs font-semibold text-left">
      <thead className="text-gray-500 uppercase sticky">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            Wallet id
          </th>
          <th scope="col" className="px-6 py-3 bg-slate-300 ">
            Wallet Adress
          </th>
          <th scope="col" className="px-6 py-3">
            USD balance
          </th>
          <th scope="col" className="px-6 py-3 bg-slate-300 ">
            BTC balance
          </th>
        </tr>
      </thead>
      <tbody>
       {
        data ? 
            data.map((i) => {
                console.log(i)
                return(
                    <tr className="border-b border-slate-300 text-sm font-semibold mx-2 text-black">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium whitespace-nowrap"
                    >
                      {i.WalletID}
                    </th>
                    <td className="px-6 py-2 bg-slate-300">
                      0xEA9d2B4a8094AC0B3039B500B85ae0B90CE1CA5d
                    </td>
                    <td className="px-6 py-2">$25,000,000</td>
                    <td className="px-6 py-2 bg-slate-300">{balanceEther}</td>
                  </tr>        
                );
            })
        : null
       }     
      </tbody>
    </table>
  </div>
  );
  }
  
  export default FundTable