"use client";

import Modal from '@/components/Modal';
import useAuth from '@/context/useAuth';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const MainPage = () => {
    const [showModal, setShowModal] = useState(null);
    const [modLoading, setModLoading] = useState(false);
    const [showToast, setShowToast] = useState("");
    const [changes, setChanges] = useState(false);
    const { token, email, userData, fetchDetails } = useAuth();

    useEffect(() => {
        if (showModal == null) {
            setModLoading(false);
        }
    }, [showModal]);

    useEffect(() => {
        if (changes == true) {
            if (showToast == "Details Updated Successfully") {
                toast.success(showToast, {
                    duration: 3000,
                    position: 'top-center',
                });
                fetchDetails();
            }
            else {
                toast.error(showToast, {
                    duration: 3000,
                    position: 'top-center',
                });
            }
            setChanges(false);
        }
    }, [changes]);

    if (userData == null) return null;

    return (
        <>
            <Toaster />
            <div className="h-auto items-start flex py-2 flex-col bg-[#f5f7ff] ">
                {!!showModal && <Modal setChanges={setChanges} userData={userData} showModal={showModal} setShowModal={setShowModal} setModLoading={setModLoading} modLoading={modLoading} setShowToast={setShowToast} />}
                <div className='flex flex-col sm:w-[95%] w-[90%] sm:mx-0 mx-auto'>
                    <div className="sm:h-[169px] h-[100px] bg-[#1E2875] mt-4 flex rounded-md">
                        <span className="text-white text-xs p-4 font">My Profile</span>
                    </div>
                    <div className='bg-white sm:-mt-20 -mt-10 z-20 flex sm:flex-row flex-col items-center justify-center mx-4 sm:mx-16 sm:p-6 p-1 rounded-xl sm:space-x-6'>
                        <div className='flex flex-col my-4 sm:w-1/2 w-full'>
                            <div className='flex flex-wrap mx-4 justify-center items-center my-4'>
                                <img src={(userData.profilePic && userData.profilePic != "") ? userData.profilePic : "./user.png"} alt="user" className='sm:h-[5.6rem] sm:w-[5.6rem] h-[4.5rem] w-[4.5rem] rounded-full' />
                                <button value="profilePic" onClick={(e) => setShowModal(e.target.value)} className='ml-auto p-2 text-xs text-black font-semibold rounded-full bg-[#F0EFFA]'>Upload Photo</button>
                            </div>
                            <div className='flex flex-col mx-4 mt-6 sm:p-6 p-4 space-y-6 border-2 shadow-md rounded-xl'>
                                <div className="flex flex-col">
                                    <span className='text-xs text-[#181818] justify-start'>
                                        Your Name
                                    </span>
                                    <div className='flex items-center'>
                                        <span className='text-sm text-black justify-start font-medium'>{userData.name}</span>
                                        <button value="name" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 lg:flex hidden text-xs bg-gray-300 rounded-full'>Edit</button>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-xs text-[#181818] justify-start'>
                                        Email
                                    </span>
                                    <div className='flex items-center'>
                                        <span className='text-sm text-black justify-start font-medium'>{userData.email}</span>
                                        <button value="email" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 lg:flex hidden text-xs bg-gray-300 rounded-full'>Edit</button>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-xs text-[#181818] justify-start'>
                                        Phone Number
                                    </span>
                                    <div className='flex items-center'>
                                        <span className='text-sm text-black justify-start font-medium'>{userData.phone !== "" ? userData.phone : "-------"}</span>
                                        <button value="phone" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 lg:flex hidden text-xs bg-gray-300 rounded-full'>Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mx-4 mt-6 sm:p-6 p-4 space-y-6 border-2 shadow-md rounded-xl'>
                                <div className="flex flex-col">
                                    <div className='flex items-center'>
                                        <span className='text-md text-[#181818] justify-start flex font-semibold'>
                                            About
                                            <p className='mx-1 text-[#413B89]'>{userData.name.indexOf(" ") >= 0 ? userData.name.substring(0, userData.name.indexOf(" ")) : userData.name}</p>
                                        </span>
                                        <button value="desc" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 text-xs bg-gray-300 rounded-full'>Edit</button>
                                    </div>
                                    <p className='mt-4 text-xs'>{userData.desc !== "" ? userData.desc : "-------"}</p>
                                </div>
                            </div>
                            <div className='flex flex-col mx-4 mt-6 sm:p-6 p-4 space-y-6 border-2 shadow-md rounded-xl'>
                                <div className="flex flex-col">
                                    <div className='flex items-center'>
                                        <span className='text-md text-[#181818] justify-start flex font-semibold'>
                                            Skills
                                        </span>
                                        <button value="skills" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 text-xs bg-gray-300 rounded-full'>Edit</button>
                                    </div>
                                    {userData.skills.map((item, index) => <p key={index} className='mt-4 text-xs font-[500]'>{item}</p>)}
                                    {userData.skills.length === 0 && <p className='mt-4 text-xs font-[500] text-gray-500'>Please Enter Your Skills here</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col my-4 sm:w-1/2 w-full'>
                            <div className='flex flex-col sm:mx-4 mx-4 sm:p-6 p-4 space-y-6 border-2 shadow-md rounded-xl'>
                                <div className="flex items-center space-x-6">
                                    <div className='flex flex-col'>
                                        <span className='text-md text-[#181818] flex font-semibold'>
                                            Professional Details
                                        </span>
                                        <p className='mt-4 text-xs'>This are the professional details shown to users in the app.</p>
                                    </div>
                                    <img className='h-[60px] w-[60px]' src="./stars.png" alt="start" />
                                </div>
                            </div>
                            <div className='flex flex-col mx-4 mt-6 space-y-6'>
                                <div className="flex">
                                    <span className='text-md text-[#181818] flex font-semibold'>Certifications</span>
                                    <button value="certifications" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 text-xs bg-gray-300 rounded-full'>Edit</button>
                                </div>
                                <div className='px-2 py-3 flex items-center justify-evenly border-2 shadow-sm rounded-full'>
                                    <img src="./Vector.png" alt="vector" className='h-[35px] w-[35px]' />
                                    <div className='flex flex-col items-center justify-center'>
                                        {userData.certifications.length > 0 && userData.certifications[0] !== "" && userData.certifications.map((item, index) => <span key={index} className="text-sm text-[#7c7c7c]">{item}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mx-4 mt-6 space-y-6'>
                                <div className="flex">
                                    <span className='text-md text-[#181818] flex font-semibold'>Experience</span>
                                    <button value="experience" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 text-xs bg-gray-300 rounded-full'>Edit</button>
                                </div>
                                {userData.experience.length === 0 && <div className='flex flex-col mt-6 p-2 space-y-6 border-2 shadow-sm rounded-lg text-gray-500'>Add Experiences</div>}
                                {userData.experience.map((item, index) => <div key={index} className='flex flex-col mt-6 p-2 space-y-6 border-2 shadow-sm rounded-xl'>
                                    <div className="flex items-center">
                                        <div className='flex flex-1 flex-col space-y-1'>
                                            <div className='text-md text-black flex font-semibold px-2'>
                                                {item.endYear === 0 && <p className='text-xs '>{item.startYear} years ({item.startYear} - Present)</p>}
                                                {(item.endYear !== 0 && item.endYear !== item.startYear) && <p className='text-xs '>{item.endYear - item.startYear} years ({item.startYear} - {item.endYear})</p>}
                                                {(item.endYear !== 0 && item.endYear === item.startYear) && <p className='text-xs '>{item.endYear} years ({item.startYear})</p>}
                                                {<p className='text-xs ml-auto mr-4'>{item.type}</p>}
                                            </div>
                                            <div className='text-md text-gray-500 flex font-semibold px-2'>
                                                <p className='text-xs '>{item.company}</p>
                                                <p className='text-xs ml-auto'>-- {item.designation}</p>
                                            </div>
                                        </div>
                                        <img className='ml-auto mr-2 h-[35px] w-[35px]' src="./logo.png" alt="start" />
                                    </div>
                                </div>)}
                            </div>
                            <div className='flex flex-col mx-4 mt-6 space-y-6'>
                                <div className="flex">
                                    <span className='text-md text-[#181818] flex font-semibold'>Education</span>
                                    <button value="education" onClick={(e) => setShowModal(e.target.value)} className='ml-auto py-1 px-6 text-xs bg-gray-300 rounded-full'>Edit</button>
                                </div>
                                <div className='flex flex-col mt-6 p-3 space-y-6 border-2 shadow-sm rounded-xl'>
                                    {!userData.education && <div className="flex flex-col space-y-2">
                                        <span className='text-sm text-gray-500 justify-start flex font-semibold'>
                                            Add Education
                                        </span>
                                    </div>}
                                    {userData.education && userData.education.map((item, index) => <div key={index} className="flex flex-col space-y-2">
                                        <span className='text-md text-[#413B89] justify-start flex font-semibold'>
                                            {item.institute}
                                        </span>
                                        <div className='w-full flex text-black font-medium '>
                                            {item.endYear != 0 && <p>({item.startYear} - {item.endYear})</p>}
                                            {item.endYear == 0 && <p>({item.startYear} - Present)</p>}
                                            <p className='ml-auto mr-7'>{item.degree}</p>
                                        </div>
                                        <p className='mt-4 text-xs'>{item.desc}</p>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage