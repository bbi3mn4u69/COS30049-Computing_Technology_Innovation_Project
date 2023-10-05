import React, {useState} from "react";

function Star() {
  
  const [hilighted, setHilighted] = useState(false)

  return (
    <button onClick={() => { hilighted ? setHilighted(false) : setHilighted(true) }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-3 h-3 ${
          hilighted
            ? 'stroke-yellow-500 fill-yellow-500'
            : 'hover:stroke-yellow-500'
        }`}
      >
        <path 
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
}

function listOfCrypto() {
  
  return (
    <div
      className="md:row-start-2 md:row-span-2 md:col-start-1 md:col-end-4 md:h-80 md:border md:pt-1 md:rounded md:border-slate-300 md:block hidden
    "
    >
      <form>
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-black sr-only dark:text-white"
        >
          Search for crypto
        </label>

        <div className="relative mx-3 mt-1 mb-2 grid grid-cols-1 ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block col-span-1 p-1 pl-11 ml-1 text-sm text-black rounded bg-slate-300"
            placeholder="Search for crypto"
            required
          ></input>
        </div>
      </form>
      {/* list of crypto */}
      <div className="overflow-y-auto h-64 overflow-x-hidden grid grid-cols-12 scroll-smooth">
        <table className="table-fixed m-2 w-full ml-5 pl-2 col-start-2 col-span-10">
          <thead>
            <tr className="sticky top-0 text-sm text-black text-left bg-slate-200">
              <th className=" text-sm pt-2 m-3 ">Pair</th>
              <th className=" text-sm pt-2 m-3 ">Price</th>
              <th className=" text-sm pt-2 m-3 ">Change</th>
            </tr>
          </thead>
          <tbody className="text-left ml-3  uppercase font-light text-black">
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>btc</div>
              </td>
              <td>$26,000</td>
              <td className="text-red-500">-10%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>eth</div>
              </td>
              <td>$1,634</td>
              <td className="text-red-500">-10%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>usdt</div>
              </td>
              <td>$0.99</td>
              <td className="text-green-500">+0.07%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>bnb</div>
              </td>
              <td>$213.1</td>
              <td className="text-red-500">-9.95%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>xrp</div>
              </td>
              <td>$0.52</td>
              <td className="text-red-500">-14.32%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>usdc</div>
              </td>
              <td>$0.99</td>
              <td className="text-red-500">-0.01%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
              <div>  ada</div>
              </td>
              <td>$0.26</td>
              <td className="text-red-500">-8.05%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
                <div>doge</div>
              </td>
              <td>$0.06</td>
              <td className="text-red-500">-11.46%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>sol</div>
              </td>
              <td>$20.66</td>
              <td className="text-red-500">-13.26%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
              <div>  trx</div>
              </td>
              <td>$0.08</td>
              <td className="text-red-500">-0.73%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
               <Star></Star>
               <div> dot</div>
              </td>
              <td>$4</td>
              <td className="text-red-500">-8.63%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
              <div>  dai</div>
              </td>
              <td>$1</td>
              <td className="text-green-500">+0.04%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
              <div>  matic</div>
              </td>
              <td>$0.55</td>
              <td className="text-red-500">-13.87%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
              <Star></Star>
              <div>  ton</div>
              </td>
              <td>$1.4</td>
              <td className="text-red-500">-5.7%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>shib</div>
              </td>
              <td>$0</td>
              <td className="text-red-500">-18.91%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>ltc</div>
              </td>
              <td>$64.9</td>
              <td className="text-red-500">-18.14%</td>
            </tr>
            <tr>
              <td className="flex flex-row space-x-1">
                <Star></Star>
                <div>wbtc</div>
              </td>
              <td>26,032</td>
              <td className="text-red-500">-10.82%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default listOfCrypto;



