import { Link } from "react-router-dom";
import bitcoinLogo from "./Image/bitcoin-15482.png";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const nav = useNavigate();

  const url = "http://localhost:3002/signup";

  const [usernameSig, setUsernameSig] = useState("");
  const [passwordSig, setpasswordSig] = useState("");

  const signup = () => {
    if (usernameSig !== null && passwordSig !== null) {
      Axios.post(url, { username: usernameSig, password: passwordSig }).then(
        (response) => {
          console.log(response);
          if (response.data.success) {
            console.log(response)
            // Show a success toast notification
            toast.success("Registration successful!", {
              position: "top-right",
              autoClose: 3000,
            });
            nav("../login_page/Login", { replace: true });
          } if(response.data.message === "Server error") {
            toast.success("Server error, please try again later", {
              position: "top-right",
              autoClose: 3000,
            });
          } if (response.data.message === "same username") {
            toast.error("Same username, please try again", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      );
    } else {
      console.log("no input field");
    }
  };
  return (
    <section class="bg-slate-200 ">
      <div
        className="absolute inset-x-0 -top-40 -z-9 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
      <div class="flex h-screen justify-center items-center top-50% -translate-y-10">
        {/* <!-- Right column container --> */}
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <div className="p-5">
            <div className="flex justify-center items-center">
              <img src={bitcoinLogo} className="h-8" alt="Bitcoin image" />
              <p className="text-2xl uppercase sm:text-3xl md:text-5xl font-semibold whitespace-nowrap mr-3 p-2 font-Noto text-yellow-600">
                bihitsun
              </p>
            </div>
          </div>
          <form>
            <div class="mb-6">
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your username
              </label>
              <input
                type="username"
                id="username"
                onChange={(e) => {
                  setUsernameSig(e.target.value);
                }}
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg bg-slate-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="username"
                required
              ></input>
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setpasswordSig(e.target.value);
                }}
                class=" bg-slate-300  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="password"
                required
              ></input>
            </div>

            {/* <!-- Login button --> */}
            <div class="text-center lg:text-left pl-3">
              <button
                type="button"
                onClick={signup}
                class="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Register
              </button>

              {/* <!-- Register link --> */}
              <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                Have an account?
                <Link
                  to="../login_page/Login"
                  class="text-danger transition duration-150 ease-in-out hover:text-purple-600 pl-2 "
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default SignUp;
