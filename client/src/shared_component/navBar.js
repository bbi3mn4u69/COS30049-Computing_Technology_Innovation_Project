import bitcoinLogo from "./Image/bitcoin-15482.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/context";
import { AuthProvider } from "../context/context";

function Login() {
  const { isLogin, setIslogin } = useAuth()
  if(isLogin == true) {
    return(
      <li>
      <Link
        to="../home_page/Home"
      > 
      <button onClick={() => {setIslogin(false)}} className="block p-0 text-gray-500 bg-slate-200 border-0 hover:text-yellow-600" >
          Log Out
      </button>        
      </Link>
  </li> 
    );
  }else{
   return (
      <li>
      <Link
        to="../login_page/Login"
        className="block p-0 text-gray-500 bg-slate-200 border-0 hover:text-yellow-600"
      >
        Log In
      </Link>
    </li>
   )
  }
}

function NavBar() {
  return (
    <nav className="bg-slate-200 sticky top-0 z-10 border border-slate-200">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-2 p-1">
        <a href="" className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <img src={bitcoinLogo} className="h-8" alt="Bitcoin image" />
            <p className=" uppercase text-xl font-semibold whitespace-nowrap mr-3 p-2 font-Noto text-yellow-600">
              bihitsun
            </p>
          </div>
        </a>
        <div className="w-auto block mr-8" id="navbar-default">
          <ul className="font-medium flex flex-row p-0 space-x-8 mt-0">
            <li>
              <Link
                to="../home_page/Home"
                className="block p-0 text-gray-500 bg-slate-200 hover:text-yellow-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="../main_page/Body"
                className="block p-0 text-gray-500 bg-slate-200 border-0 hover:text-yellow-600"
              >
                Trading
              </Link>
            </li>
            <Login></Login>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}
export default NavBar;
