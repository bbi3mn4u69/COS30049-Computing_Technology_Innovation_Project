import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./shared_component/navBar";
import Body from "./main_page/Body";
import Footer from "./shared_component/footer";
import Home from "./home_page/Home";
import NoPage from "./main_page/NoPage";
import Login from "./login_page/Login";
import SignUp from "./signup_page/Signup";
import { useAuth } from "./context/context";

function App() {
  const location = useLocation();
  const { isLogin, setIslogin} = useAuth();
  // Determine whether to show the NavBar and Footer
  const isLoginPage = location.pathname === "/login_page/Login";
  const isSignUpPage = location.pathname === "/signup_page/Signup";
  const isNopage = location.pathname === "*";
  const showNavBarAndFooter = !isLoginPage && !isNopage && !isSignUpPage;

  // let au = localStorage.getItem('authentication')
  //   if(au === "true") {
  //     setIslogin(true)
  //   }else {
  //     setIslogin(false)
  //   }
  return (
    <>
          {showNavBarAndFooter && <NavBar></NavBar>}
          <div className="content-container">
            <Routes>
              <Route index element={<Home></Home>}></Route>
              {isLogin ? (
                <>
                  {/* If isLogin is true, don't render login and signup pages */}
                  <Route path="/home_page/Home" element={<Home></Home>}></Route>
                  <Route path="/main_page/Body" element={<Body></Body>}></Route>
                </>
              ) : (
                <>
                  {/* If isLogin is false, don't render Body page */}
                  <Route
                    path="/login_page/Login"
                    element={<Login></Login>}
                  ></Route>
                  <Route
                    path="/signup_page/Signup"
                    element={<SignUp></SignUp>}
                  ></Route>
                </>
              )}
              <Route path="/home_page/Home" element={<Home></Home>}></Route>
              <Route path="*" element={<NoPage></NoPage>}></Route>
            </Routes>
          </div>
          {showNavBarAndFooter && <Footer></Footer>}
    </>
  );
}

export default App;
