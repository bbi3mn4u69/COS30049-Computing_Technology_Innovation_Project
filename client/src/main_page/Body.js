import BuyArea from "./Buyzone";
import SellArea from "./Sellzone";
import GraphArea from "./Visualization/container/Graphzone";
import MultiFunction from "./Multifunction";
import BalanceAndFund from "./Balance&Fund";
import ListOfCrypto from "./ListOfCrypto";
import TradingSection from "./trading";
import Coininfor from "./Crypto";
import Ordersell from "./Orderbook_sell";
import Orderbuy from "./Orderbook_buy";
import OrderHistory  from "./OrderHistory";

function Body() {
  return (
    <div className="bg-slate-200 ">
      {/* divide by 12 cols */}
      <div
        className="md:grid md:grid-cols-12 md:grid-flow-row md:gap-1
      grid grid-cols-3 overflow-x-hidden gap-1 
      "
      >
        {/* order book sell*/}
        <div
          className="md:row-start-1 md:row-span-3 md:col-start-10 md:col-end-13 md:mt-1 md:rounded md:border-slate-300 md:border md:block
        hidden
        "
        >
          <Ordersell></Ordersell>
        </div>
        <div
          className="md:row-start-4 md:row-span-3 md:col-start-10 md:col-end-13 md:mt-1 md:rounded md:border-slate-300 md:border md:block
        hidden
        "
        >
          <Orderbuy></Orderbuy>
        </div>

        {/* current coin */}
        <div
          className="md:row-start-1 md:row-span-1 md:mt-1 md:h-15 md:col-start-1 md:col-end-10 md:border-slate-300 md:rounded md:border 
        row-start-1 col-start-1 col-end-4 row-span-1
        "
        >
          {/* crypto currentcy and the information about that crypto */}
          <Coininfor></Coininfor>
        </div>

        {/* list of crypto */}
        <ListOfCrypto></ListOfCrypto>
        {/* trading */}
        <div
          className="md:mt-1 md:row-start-4 md:row-span-3 md:rounded md:col-start-1 md:col-end-4 md:border md:border-slate-300 md:block 
        hidden
        "
        >
          <TradingSection></TradingSection>
        </div>

        <div
          className="md:row-start-2 md:row-span-3 md:col-start-4 md:col-end-10 md:bg-slate-100 h-500
        row-start-2 row-span-1 col-end-4 col-start-1 bg-white z-2 
        "
        >
          {/* graph area */}
          <GraphArea></GraphArea>
        </div>

        {/* buy & sell area */}
        <div
          className="md:row-start-5 md:row-span-2 md:col-start-4 md:col-end-10 md:border md:rounded md:bg-slate-200 md:border-slate-300 
        row-start-3 row-end-6 col-start-1 col-span-3 bg-slate-200
        "
        >
          {/* MULTIFUNCTION */}
          <MultiFunction></MultiFunction>

          {/* balance and fund */}
          <BalanceAndFund></BalanceAndFund>

          <div className="sm:grid sm:p-0 grid-cols-9 sm:grid-cols-12 sm:gap-10 sm:mx-3 lg:mx-10 flex flex-col p-5 m-0">
            {/* buy zone */}
            <BuyArea></BuyArea>
            {/* sell zone */}
            <SellArea></SellArea>
          </div>
        </div>
        {/* order history */}
        <div
          className="md:bg-slate-200 border h-52 md:rounded border-slate-300 md:row-start-7 md:row-span-1 md:col-start-1 md:col-end-13 md:block
        row-start-6 row-span-1 col-start-1 col-end-4 
        "
        >
          <OrderHistory></OrderHistory>
        </div>
      </div>
    </div>
  );
}

export default Body;
