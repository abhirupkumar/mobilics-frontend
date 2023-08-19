import React, { useEffect, useState } from 'react'
import AccountBar from './AccountBar'
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = ({ userData, sidebar, setSidebar, logout }) => {

    return (
        <header className="w-full z-30 flex px-10 py-2 " style={{
            boxShadow: "0px 1px 0px 0px #e7e7e7"
        }}>
            <div className="flex lg:hidden items-center space-x-4">
                <button onClick={() => setSidebar(!sidebar)} >
                    <AiOutlineMenu className="text-black" />
                </button>
                <img src="./logo.png" alt="logo" className="h-[27px] w-[59px]" />
            </div>
            <nav className="ml-auto flex flex-wrap items-center text-base justify-center">
                {userData != null && <AccountBar userData={userData} logout={logout} />}
            </nav>
        </header>
    )
}

export default Navbar