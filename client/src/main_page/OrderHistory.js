import Axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import { toast } from "react-toastify";
import Defaultable from "./DefaultTable";
import FundTable from "./FundTable";
import web3 from "../shared_component/web3";

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
        {{
          2: <FundTable />,
        }[selectedOrder] ?? <Defaultable />}
      </div>
    </div>
  );
}

export default OrderHistory;
