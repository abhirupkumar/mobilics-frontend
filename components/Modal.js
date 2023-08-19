"use client";

import { handleSubmit, handleSubmit2 } from '@/app/actions';
import { modalmenu } from '@/modalmenu';
import React, { useState } from 'react'
import Loader from './Loader';
import { AiFillDelete } from 'react-icons/ai';

const Modal = ({ userData, setChanges, showModal, setShowModal, setModLoading, modLoading, setShowToast }) => {

    const fields = modalmenu[showModal] ?? null;
    fields.value = userData[showModal] ?? null;
    const generalmodals = ["name", "email", "phone", "desc"];
    const smallarraymodals = ["skills", "certifications"];
    const bigarraymodals = ["experience", "education"];
    const [val, setVal] = useState(fields.value ?? []);
    const [newVal, setNewVal] = useState('');
    const [newArray, setNewArray] = useState({});
    const [array, setArray] = useState(fields.value ?? []);
    const [image, setImage] = useState(fields.value ?? "");
    const [url, setUrl] = useState("");

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mobilics")
        data.append("cloud_name", "dfm2irc9v")
        fetch("https://api.cloudinary.com/v1_1/dfm2irc9v/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    const handleAddVal = (e) => {
        e.preventDefault();
        setVal([...val, newVal]);
        setNewVal('');
    };

    const handleRemoveVal = (e, index) => {
        e.preventDefault()
        setVal(val.filter((_, i) => i !== index));
    };

    const submit = async (FormData) => {
        setModLoading(true);
        let res = await handleSubmit(FormData, userData);
        if (res.success) {
            setShowToast('Details Updated Successfully')
            setChanges(true);
            setModLoading(false);
            setShowModal(null);
        }
        else {
            setShowToast(res.message)
            setChanges(true);
            setModLoading(false);
        }
    }

    const handleAddArray = (e) => {
        e.preventDefault();
        setArray([...array, newArray]);
        setNewArray([]);
    };

    const handleRemoveArray = (e, index) => {
        e.preventDefault()
        setArray(array.filter((_, i) => i !== index));
    };

    const submitArray = async () => {
        setModLoading(true);
        const FormData = {}
        FormData[showModal] = val
        let res = await handleSubmit2(FormData, userData);
        if (res.success) {
            setShowToast('Details Updated Successfully')
            setChanges(true);
            setModLoading(false);
            setShowModal(null);
        }
        else {
            setShowToast(res.message)
            setChanges(true);
            setModLoading(false);
        }
    }

    const submitArray2 = async () => {
        setModLoading(true);
        const FormData = {}
        FormData[showModal] = array;
        let res = await handleSubmit2(FormData, userData);
        if (res.success) {
            setShowToast('Details Updated Successfully')
            setChanges(true);
            setModLoading(false);
            setShowModal(null);
        }
        else {
            setShowToast(res.message)
            setChanges(true);
            setModLoading(false);
        }
    }

    const submitPic = async () => {
        setModLoading(true);
        const FormData = {}
        FormData[showModal] = url;
        let res = await handleSubmit2(FormData, userData);
        if (res.success) {
            setShowToast('Details Updated Successfully')
            setChanges(true);
            setModLoading(false);
            setShowModal(null);
        }
        else {
            setShowToast(res.message)
            setChanges(true);
            setModLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font-semibold">Update Details</h3>
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(null)}
                        >
                            <span className="text-black opacity-7 py-2 px-4 text-xl block bg-gray-400 rounded-full">
                                X
                            </span>
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                        {showModal === 'profilePic' && <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                            <div className="">
                                <div className="flex space-x-5 items-center">
                                    <div className="flex flex-col space-y-2 items-center">
                                        <input type="file" name="profilePic" className='cursor-pointer' onChange={(e) => setImage(e.target.files[0])}></input>
                                    </div>
                                    <button className="p-2 bg-blue-600 text-white hover:blue-700" onClick={uploadImage}>Upload</button>
                                </div>
                                {url != "" && <img className='sm:h-[5.6rem] sm:w-[5.6rem] h-[4.5rem] w-[4.5rem]' src={url} alt="image" />}
                            </div>
                            {!modLoading ? <button
                                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                onClick={submitPic}
                            >
                                Submit
                            </button> : <Loader />}
                        </div>}
                        {generalmodals.includes(showModal) && <form action={submit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                            <div className="">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fields.name}>
                                    {fields.title}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name={fields.name}
                                    type={fields.type}
                                    placeholder={fields.title}
                                    defaultValue={fields.value}
                                />
                            </div>
                            {!modLoading ? <button
                                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="submit"
                            >
                                Submit
                            </button> : <Loader />}
                        </form>}
                        {smallarraymodals.includes(showModal) && <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                            <div className="">
                                <div className="flex space-x-4 items-center">
                                    <input
                                        value={newVal}
                                        onChange={(e) => setNewVal(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <button className="p-2 bg-blue-600 text-white hover:blue-700" onClick={handleAddVal}>
                                        Add
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    {val.map((item, index) => <div key={index} className="items-center flex">
                                        <p className="bg-white text-black p-1 rounded-sm">{item}</p>
                                        <button onClick={(e) => handleRemoveVal(e, index)}>
                                            <AiFillDelete />
                                        </button>
                                    </div>)}
                                </div>
                            </div>
                            {!modLoading ? <button
                                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                onClick={submitArray}
                            >
                                Submit
                            </button> : <Loader />}
                        </form>}
                        {bigarraymodals.includes(showModal) && <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                            <div className="">
                                <div className="flex space-x-5 items-center">
                                    <div className="flex flex-col space-y-2 items-center">
                                        {fields.fields.map((item, index) => <div key={index} className='flex flex-col space-y-2'>
                                            <label htmlFor={item.title}>{item.title}</label>
                                            <input
                                                name={item.name}
                                                value={newArray[item.name] ?? ''}
                                                onChange={(e) => setNewArray({ ...newArray, [item.name]: e.target.value })}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>)}
                                    </div>
                                    <button className="p-2 bg-blue-600 text-white hover:blue-700" onClick={handleAddArray}>
                                        Add
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    {array.map((item, index) => <div key={index} className="items-center flex">
                                        {!!item.company && <p className="bg-white text-black p-1 rounded-sm">{item.company}</p>}
                                        {!!item.designation && <p className="bg-white text-black p-1 rounded-sm">{item.designation}</p>}
                                        {!!item.type && <p className="bg-white text-black p-1 rounded-sm">{item.type}</p>}
                                        {!!item.institute && <p className="bg-white text-black p-1 rounded-sm">{item.institute}</p>}
                                        {!!item.degree && <p className="bg-white text-black p-1 rounded-sm">{item.degree}</p>}
                                        {!!item.desc && <p className="bg-white text-black p-1 rounded-sm">{item.desc}</p>}
                                        {!!item.startYear && item.startYear > 0 && <p className="bg-white text-black p-1 rounded-sm">{item.startYear}</p>}
                                        {!!item.endYear && item.endYear > 0 && <p className="bg-white text-black p-1 rounded-sm">{item.endYear}</p>}
                                        <button onClick={(e) => handleRemoveArray(e, index)}>
                                            <AiFillDelete />
                                        </button>
                                    </div>)}
                                </div>
                            </div>
                            {!modLoading ? <button
                                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                onClick={submitArray2}
                            >
                                Submit
                            </button> : <Loader />}
                        </div>}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        {!modLoading && <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => setShowModal(null)}
                        >
                            Close
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal