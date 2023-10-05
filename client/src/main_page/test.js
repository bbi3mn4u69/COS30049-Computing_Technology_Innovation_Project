import React, { useState } from "react";
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { Link } from "react-router-dom";


const NavMobile = ({value,to,onClick}) => {
    return (
        <Link onClick={onClick} to ={to} className="p-4 
        border-b border-b-[#4b64d1]  
        hover:bg-[#4b64d1] 
        rounded-xl 
        hover:rounded-xl 
        hover:scale-105 
        duration-300 transform 
        hover:text-white">{value}</Link>
    )
}

const Navbar = () => {
    const [nav,setNav] = useState(true)

    const handleNav = ()=>{
        setNav(!nav)
    }
    
    return (
            <nav className="flex justify-between h-13 text-[#4b64d1]">
                <div className="md:fixed w-[95%] text-sm sm:text-xs font-bold text-black">  
                    <div className="flex">
                        <Link to = "/" className ="hidden md:block md:w-full text-3xl font-bold text-[#4b64d1] px-10">CheckerV.</Link> 
                        <div className="hidden md:flex items-center md:w-[30%] ml-[5%]">
                            <Link to ="/about" className = "p-3 hover:bg-[rgb(75,100,209)] rounded-xl hover:rounded-xl hover:scale-105 duration-300 transform hover:text-white">About</Link>
                            <Link to ="/" className = "p-3 hover:bg-[rgb(75,100,209)]  rounded-xl hover:rounded-xl hover:scale-105 duration-300 transform hover:text-white ">Get Started</Link>
                        </div>
                        <div onClick={handleNav} className="fixed top-[2%] left-[90%] md:">
                            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size = {20}/>}
                        </div>
                    </div>
                </div>   
                
                <div className={!nav ? "fixed left-0 top-0 sm:w-[30%] md:w-[20%] h-full text-[#4b64d1] border-r border-r-[#4b64d1] bg-white ease-in-out duration-500": "fixed right-[100%]"}>
                    <h1 className="w-full text-3xl font-bold text-[#4b64d1]">CheckerV.</h1>
                    <ul className="uppercase p-2 text-sm flex flex-col">
                        <NavMobile onClick={handleNav} to="/" value="Home"/>
                        <NavMobile onClick={handleNav} to="/about" value="About"/>
                        <NavMobile onClick={handleNav} to="/about" value="Get Started"/>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar