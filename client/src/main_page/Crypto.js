


function crypto() {

  return (
    <div
      className="md:flex md:flex-row md:mx-5 md:my-2 md:justify-between md:w-auto
    flex flex-row my-2 justify-evenly"
    >
      <div
        className="md:flex md:flex-row md:items-center md:border-r md:border-slate-400
      flex flex-row items-center border-r border-slate-400 mr-3"
      >
        <div className="text-black block uppercase text-xl font-semibold pr-2">
          btc/usdt
        </div>
        <div className="text-black block text-xs font-light underline underline-offset-2 pr-2">
          Bitcoin Price
        </div>
      </div>
      <div
        className="md:flex md:flex-col
      flex flex-col"
      >
        {/* current price of that crypto */}
        <div className="text-red-500 block text-left">1,853.81</div>
        {/* current price of that crypto */}
        <div className="text-black block text-left">$1,853.18</div>
      </div>
      <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
        {/* 24h change */}
        <div className="text-neutral-400 block text-xs font-bold text-left">
          24h Change
        </div>
        <div className="text-green-500 block text-left">+6.28 +0.34%</div>
      </div>
      <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
        {/* 24h high */}
        <div className="text-neutral-400 block text-left text-xs font-bold ">
          24h High
        </div>
        <div className="text-black block text-left">1,852.81</div>
      </div>
      <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
        {/* 24h Low */}
        <div className="text-neutral-400 block text-left text-xs font-bold ">
          24h Low
        </div>
        <div className="text-black block text-left">1,844.82</div>
      </div>
      <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
        {/* 24h Volume (ETH) */}
        <div className="text-neutral-400 block text-left text-xs font-bold ">
          24h Volume(ETH)
        </div>
        <div className="text-black block text-left ">1,844.82</div>
      </div>
      <div className="md:flex md:flex-col md:space-y-1 md:visible hidden">
        {/* 24h Volume (USDT) */}
        <div className="text-neutral-400 block text-left text-xs font-bold ">
          24h Volume(USDT)
        </div>
        <div className="text-black block text-left">1,844.82</div>
      </div>
    </div>
  );
}
export default crypto;
