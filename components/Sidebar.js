"use client"

import { menuItems } from '@/menuItems'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { usePathname } from 'next/navigation'

const Sidebar = ({ sidebar, setSidebar, logout }) => {
    const pathname = usePathname()
    const sidenavref = useRef(null)
    useEffect(() => {
        document.addEventListener('mousedown', handleclickoutside)

        return () => {
            document.removeEventListener('mousedown', handleclickoutside)
        }
    }, [])

    const handleclickoutside = (e) => {
        if (sidenavref.current && !sidenavref.current.contains(e.target)) {
            setSidebar(false)
        }
    }

    return (
        <div ref={sidenavref} className={`w-[300px] flex-col py-3 h-[100vh] top-0 transition-transform bg-white z-40 ${sidebar ? "lg:flex lg:sticky fixed translate-x-0" : "lg:flex lg:sticky fixed lg:translate-x-0 -translate-x-[40rem]"}`} >
            <h3 className='text-black font-medium mx-auto text-[24px] py-2 px-6 border-2 border-[#ececec] rounded-md page-profile'>Dashboard</h3>
            <div className="flex flex-col h-[80%] items-center mt-10">
                {menuItems.map((item, index) => (<div key={index} className={`flex items-center my-4 space-x-2`}>
                    <AiOutlineRight className="text-sm" />
                    <Link href={item.url} className={`w-[164px] h-[47px] flex items-center justify-center ${pathname == item.url ? "border-2 border-[#413B89]" : ""} rounded-lg`}>
                        <span className={`font-serif text-[20px] text-[#1A1558]`}>{item.title}</span>
                    </Link>
                </div>))}
                <span onClick={logout} className='mt-auto cursor-pointer'>Log Out</span>
            </div>
        </div>
    )
}

export default Sidebar