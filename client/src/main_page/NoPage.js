import NopageImage from "./Image/Monster404.png";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="bg-slate-200">
      <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12 min-h-screen">
        <div className="wf-ull lg:w-1/2">
          <div className="text-sm font-medium text-blue-500">
            404 error
          </div>
          <div className="mt-3 text-2xl font-semibold text-black md:text-3xl">
            Page not found
          </div>
          <div className="mt-4 text-gray-700 ">
            Hmm, the page you looking for seem doesn't exist
          </div>

          <div className="flex items-center mt-6 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm border rounded-lg gap-x-3 sm:w-auto hover:bg-gray-800 bg-gray-900 text-gray-200 border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <div>
                <Link to="../home_page/Home">Take Me Home</Link>
              </div>
            </button>
          </div>
        </div>
        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src={NopageImage}
            alt="404 image"
          ></img>
        </div>
      </div>
    </div>
  );
}
export default NoPage;
