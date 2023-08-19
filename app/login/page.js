"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '@/components/Loader'
import { setToken } from '@/features/tokenSlice'
import { Toaster, toast } from 'react-hot-toast'

const Page = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.authToken.token)
    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [])

    if (!!token) {
        return <Loader />
    }

    const handleChange = async (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() //prevents reloading the form after setup
        setLoading(true)
        const data = { email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.success) {
            setEmail('')
            setPassword('')
            dispatch(setToken({ token: response.token }))
            toast.success('Login Successful', {
                duration: 3000,
                position: 'top-center',
            });
            setTimeout(() => {
                router.push(`/`)
            }, 2000)
        }
        else {
            setLoading(false)
            toast.error(response.message, {
                duration: 3000,
                position: 'top-center',
            });
        }
    }

    return (
        <div>
            <Toaster />
            <div className="min-h-full mt-10 flex items-center justify-center pt-12 pb-44 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link href={'/'}><img className="mx-auto w-auto cursor-pointer rounded-md" src="./logo.png" alt="Workflow" /></Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
                        <div className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href={'/signup'}><div href="#" className="font-medium text-[#5377ec] hover:text-[#1a4ffd]"> Sign Up </div></Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div className="justify-center">
                            {loading ? <Loader /> : <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a4ffd] hover:bg-[#1440d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                                    <svg className="h-5 w-5 text-[#e7faff] group-hover:text-[#a4edff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page