import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";
import { useAuth } from "../context/context";

export default function Home() {

  const { isLogin } = useAuth()

  function Scroll() {
    const scrollElement = document.getElementById("about");
    scrollElement.scrollIntoView({behavior:"smooth"});
  }

  return (
    <div className="bg-slate-200 scroll-smooth">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to our project of COS30049
            </div>
            <div className="mt-6 text-lg leading-8 text-gray-600">
              We are team 1-23. In this project, we are going to implement an
              aesthetic website for user to explore and trade variety of
              cryptocurrencies options
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to= {isLogin ? "../main_page/Body" : "../login_page/Login"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <button
                onClick={() => {Scroll()}}
                className="text-sm font-semibold leading-6 text-gray-900 scroll-auto"
              >
                About us <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] h-96 -z-9 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="mx-auto  bg-slate-200 w-1/2 flex justify-center py-12 sm:py-24 lg:py-32 "
          id="about"
        >
          <div className="flex justify-between flex-col sm:flex-row ">
            {/** This section contain information about the team */}
            <div className="flex flex-row items-center ">
              <div className="-translate-y-10">
                <div className="mt-10 mb-5 text-4xl text-center sm:text-left sm:text-6xl text-black font-bold">
                  About us
                </div>
                <div className="mb-3 text-gray-500  first-letter:text-gray-500">
                  Our team has 3 members: Bill Pham, The Son Ngo and Linh Bao
                  Nguyen. All of us are Vietnamese who are passionate about
                  computer programming and designing beautiful products.
                </div>
                <div className="mb-5 text-gray-500 ">
                  Given the opportunity to implement a website for trading
                  cryptocurrencies and explore blockchain concepts, we will try
                  our best to provide users with the best experiences in trading
                  cryptos and tracking the market.
                </div>
              </div>
            </div>
            {/**Images gallery */}
            <div>
              <ImageCarousel></ImageCarousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
