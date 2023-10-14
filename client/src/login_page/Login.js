import { Link } from "react-router-dom";
import bitcoinLogo from "./Image/bitcoin-15482.png";
import { useState } from "react";
import  Axios  from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/context";

export default function Login() {


  const {username, setUserName} = useAuth();
  const { isLogin, setIslogin} = useAuth();
  const nav = useNavigate();

  const url = "http://localhost:3002/login"
  
  const [passwordLogin, setpasswordLogin] = useState("");
  
  const login = () => {
    if (username !== null && passwordLogin !== null) {
      Axios.post(url, 
        {username: username, password: passwordLogin})
        .then((response) => {
          console.log(response)
        if (response.data.message == 'true') {
          toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000,
          }) 
          setIslogin(true)
          localStorage.setItem('username', username)
          localStorage.setItem('authentication', true )
          nav('../main_page/Body', {replace: true})
        } else {
          setIslogin(false)
          localStorage.setItem('authentication', false)
            toast.error('Login unsuccessful!', {
              position: 'top-right',
              autoClose: 3000,
            })
         
        }
      })
    }else{
      toast.success('Missing username or password!', {
        position: 'top-right',
        autoClose: 3000,
      }) 
    }
  }

  return (
    <section className="bg-slate-200 h-screen">
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

      <div className="flex flex-col justify-center px-6 py-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="border-2 rounded-lg border-violet-300 ">
            <div className="p-5">
              <div className="flex justify-center items-center">
                <img src={bitcoinLogo} className="h-8" alt="Bitcoin image" />
                <p className="text-2xl uppercase sm:text-3xl md:text-5xl font-semibold whitespace-nowrap mr-3 p-2 font-Noto text-yellow-600">
                  bihitsun
                </p>
              </div>
              <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10">
            <form className="space-y-6 p-2" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e) => {setUserName(e.target.value)}}
                      autoComplete="email"
                      required
                      className="block w-full bg-slate-300 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-slate-300 placeholder:text-gray-400 sm:text-sm "
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => {setpasswordLogin(e.target.value)}}
                      required
                      className="block w-full rounded-md bg-slate-300 border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    onClick={login}
                    type="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="mt-10 text-center text-sm text-gray-500 pb-3">
                Not a member?
                <Link
                  to="../signup_page/Signup"
                  className="font-semibold pl-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  sign up now?
                </Link>
                <Link
                  to="../home_page/Home"
                  className="font-semibold pl-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
