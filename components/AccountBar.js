"use client";

import React, { useState } from 'react'
import { GrNotification } from 'react-icons/gr'
import { BsChevronDown } from 'react-icons/bs'

const AccountBar = ({ userData, logout }) => {
    const [isList, setIsList] = useState(false);
    return (
        <div className='flex items-center space-x-4'>
            <GrNotification className='sm:text-base text-sm' />
            <div className='flex items-center space-x-4 py-1 border-2 rounded-md px-2 border-[#f7f6f6]'>
                <img src={(userData.profilePic && userData.profilePic != "") ? userData.profilePic : "./user.png"} alt='user' className="sm:h-[34px] sm:w-[34px] h-[40px] w-[40px] sm:rounded-none rounded-full" />
                <div className='sm:flex hidden flex-col items-start'>
                    <span className='text-xs text-black font-medium font-poppins'>Welcome Back</span>
                    <span className='sm:text-lg text-sm text-black font-medium font-poppins'>{(userData.name && userData.name != "") ? userData.name : "Vishnu Swaroop"}</span>
                </div>
                <button className="sm:flex hidden" onClick={() => setIsList(!isList)} >
                    <BsChevronDown className='text-black' />
                </button>
            </div>
            <div>
                {isList && <div className='absolute top-[60px] right-0 pl-2 pr-4 bg-white border-2 border-[#e6e5e5] space-y-2 rounded-md p-2'>
                    <div onClick={logout} className='flex flex-col cursor-pointer items-start p-2'>
                        Log Out
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AccountBar