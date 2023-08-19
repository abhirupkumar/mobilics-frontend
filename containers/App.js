"use client";

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/features/tokenSlice';
import useAuth, { AuthProvider } from '@/context/useAuth';
const jwt = require('jsonwebtoken');

const App = ({ children }) => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AuthProvider>
                    <Main children={children} />
                </AuthProvider>
            </PersistGate>
        </Provider>
    )
}

const Main = ({ children }) => {
    const [sidebar, setSidebar] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const [show, setShow] = useState(true)

    const { token, userData, logout } = useAuth();

    useEffect(() => {
        if (token == null && pathname != '/login' && pathname != '/signup' && pathname != '/account')
            router.push('/login');
        if (pathname == '/login' || pathname == '/signup')
            setShow(false);
        else
            setShow(true);
    }, [token, pathname])

    return (
        <div className="relative min-h-screen flex max-w-[2000px]">
            {show && <Sidebar logout={logout} sidebar={sidebar} setSidebar={setSidebar} />}
            <div className="flex py-2 w-full flex-col items-center">
                {show && <Navbar userData={userData} logout={logout} sidebar={sidebar} setSidebar={setSidebar} />}
                {children}
            </div>
        </div>
    )
}

export default App