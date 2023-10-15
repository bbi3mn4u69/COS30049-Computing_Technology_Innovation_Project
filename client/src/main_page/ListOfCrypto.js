
import React, {useState, useEffect} from "react";
import pLimit from 'p-limit';

import Axios from "axios";

function Star({ value, data, setData }) {
  const [hilighted, setHilighted] = useState(false);
  

  const HandleStarClick = (id) => {

    const updatedData = [...data];
    const index = data.findIndex((item) => item.Assest_ID === id);
    console.log(index)
    const [starredItem] = updatedData.splice(index, 1);
    updatedData.unshift(starredItem);
    setData(updatedData)
  };

  return (
    <button
      onClick={() => {
        HandleStarClick(value)

        hilighted ? setHilighted(true) : setHilighted(false)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-3 h-3 ${
          hilighted
            ? "stroke-yellow-500 fill-yellow-500"
            : "hover:stroke-yellow-500"
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

function L({ data }) {
  function filterData(data) {
    // Get today's date in the format "YYYY-MM-DD"
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.0000000Z';
    

    // Filter the data
    let filteredData = [];
    let pairs = new Set();
    for (let i = 0; i < data.length; i++) {
        if (data[i].date === today && !pairs.has(data[i].pair)) {
            filteredData.push(data[i]);
            pairs.add(data[i].pair);
        }
    }
    return filteredData;
  }
  data = filterData(data)
}
 
  

function ListOfCrypto() {
  const [data1, setData] = useState([]);
  const [search, setSearch] = useState("");
  const url = "http://localhost:3002/api/get/assestlist";

  useEffect(() => {
    Axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="block col-span-1 p-1 pl-11 ml-1 text-sm text-black rounded bg-slate-300"
            placeholder="Search for crypto"
            required
          ></input>
        </div>
      </form>
      {/* list of crypto */}
      <div className="overflow-y-auto h-64 overflow-x-hidden grid grid-cols-12 scroll-smooth">
        <table className="table-fixed m-2 w-full h-fit ml-5 pl-2 col-start-2 col-span-10">
          <thead>
            <tr className="sticky top-0 text-sm text-black text-left bg-slate-200">
              <th className=" text-sm pt-2 m-3 ">Pair</th>
              <th className=" text-sm pt-2 m-3 ">Price</th>
              <th className=" text-sm pt-2 m-3 ">Change</th>
            </tr>
          </thead>
          <tbody className="text-left ml-3  uppercase font-light text-black">
            {data1
              ? data1
                  .filter((val) => {
                    return search.toLowerCase() === ""
                      ? val
                      : val.assest_name.toLowerCase().includes(search);
                  })
                  .map((val) => {
                    let change = true;
                    if (val.assest_change === "-") {
                      change = false;
                    } else {
                      change = true;
                    }
                    if (val !== null) {
                      return (
                        <tr>
                          <td className="flex flex-row space-x-1">
                               <Star value={val.Assest_ID} data={data1} setData={setData} />  
                            <div>{val.assest_name}</div>
                          </td>
                        </tr>

                  )}
                  })
              : null}
               {/* { {data.map((row, index) => {
                      return(
                      <td>{row.close}</td>
                      <td className={row.changeClass}>{row.change_percent}</td>
                    )
                  })
                } } */}

          </tbody>

        </table>
      </div>
    </div>
  );
}
export default ListOfCrypto;

