"use client";

import useAuth from '@/context/useAuth';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { handleSubmit2 } from '../actions';

const page = () => {

    const { allData, userData, fetchDetails } = useAuth();

    const [connections, setConnections] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData != null && allData != null) {
            setConnections(allData.filter((item) => userData.connections.includes(item._id)));
            const filteredData = allData.filter((item) => userData._id != item._id);
            setSuggestions(filteredData.filter((item) => !userData.connections.includes(item._id)));
        }
    }, [userData, allData]);

    const addConnect = async (_id) => {
        setLoading(true)
        const connects = [...userData.connections, _id];
        const FormData = { "connections": connects };
        let response = await handleSubmit2(FormData, userData)
        if (response.success == true) {
            toast.success("Connection added!", {
                duration: 3000,
                position: 'top-center',
            });
            fetchDetails();
        }
        else {
            toast.error("Some error occured! Couldn't add to your connection.", {
                duration: 3000,
                position: 'top-center',
            });
        }
        setLoading(false);
    }

    const removeConnect = async (_id) => {
        setLoading(true)
        const connects = userData.connections.filter((item) => item != _id);
        const FormData = { "connections": connects };
        let response = await handleSubmit2(FormData, userData)
        if (response.success == true) {
            toast.success("Connection Removed!", {
                duration: 3000,
                position: 'top-center',
            });
            fetchDetails();
        }
        else {
            toast.error("Some error occured! Couldn't remove your connections.", {
                duration: 3000,
                position: 'top-center',
            });
        }
        setLoading(false);
    }

    return (
        <>
            <Toaster />
            <div className="h-full items-start w-full flex py-2 flex-col bg-[#f5f7ff] ">
                <div className='flex flex-col w-[90%] mx-auto'>
                    <div className="sm:h-[77px] h-[60px] bg-[#1E2875] mt-4 flex rounded-md">
                        <span className="text-white sm:text-lg text-base p-4 font-medium">My Connections</span>
                    </div>
                </div>
                <div className="sm:mx-4 w-full flex flex-wrap mt-4 sm:justify-normal justify-center">
                    {!!connections && connections.map((item, index) => <div key={index} className='flex w-[19rem] flex-col sm:p-4 p-2 mb-4 mx-4 space-y-6 border-2 shadow-sm rounded-md'>
                        <div className="flex items-center space-x-6">
                            <div className='flex flex-col w-[60%]'>
                                <span className='text-md text-[#181818] flex font-semibold'>
                                    {item.name}
                                </span>
                                <p className='mt-4 text-xs'>{item.experience[0].designation} @{item.experience[0].company}</p>
                                {!loading ? <button onClick={() => removeConnect(item._id)} className='px-2 py-1 text-xs mt-6 rounded-full bg-[#BAB6EB]'>Remove Connections</button> : "Removing..."}
                            </div>
                            <img className='sm:h-[5.6rem] sm:w-[5.6rem] h-[4.5rem] w-[4.5rem] rounded-full' src={(item.profilePic && item.profilePic != "") ? item.profilePic : "./user.png"} alt="start" />
                        </div>
                    </div>)}
                </div>
                <div className='sm:mt-20 mt-6 text-xl sm:mx-8 mx-auto text-[#222222]'>People you can also connect</div>
                <div className="sm:mx-4 w-full flex flex-wrap mt-4 sm:justify-normal justify-center">
                    {!!suggestions && suggestions.map((item, index) => <div key={index} className='flex w-[19rem] flex-col sm:p-4 p-2 mb-4 mx-4 space-y-6 border-2 shadow-sm rounded-md'>
                        <div className="flex items-center space-x-6">
                            <div className='flex flex-col w-[60%]'>
                                <span className='text-md text-[#181818] flex font-semibold'>
                                    {item.name}
                                </span>
                                <p className='mt-4 text-xs'>{item.experience[0].designation} @{item.experience[0].company}</p>
                                {!loading ? <button onClick={() => addConnect(item._id)} className='px-2 py-1 text-xs mt-6 rounded-full bg-[#BAB6EB]'>Connect</button> : "Connecting..."}
                            </div>
                            <img className='sm:h-[5.6rem] sm:w-[5.6rem] h-[4.5rem] w-[4.5rem] rounded-full' src={(item.profilePic && item.profilePic != "") ? item.profilePic : "./user.png"} alt="start" />
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default page