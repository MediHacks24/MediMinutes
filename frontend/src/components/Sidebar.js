import React, { useState, useEffect } from 'react'
//import { json } from 'react-router-dom';

export default function Sidebar({ data, setCurrentSection }) {
    const [keyArray, setKeyArray] = useState([]);

    useEffect(() => {
        console.log(data)
    }, []);

    return (
        <div className='w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black'>
            <div className='fixed left-0 bg-[#20AC58] w-5 h-[100vh] top-0'></div>
            <div className='flex flex-col gap-y-20 pl-8 '>
                <h1 className='text-4xl font-extrabold'>Sections</h1>
                <ul className='
            overflow-hidden text-ellipsis whitespace-nowrap flex flex-col gap-y-2 '>
                    {data.map((key, index) => (
                        <li key={index} onClick={() => setCurrentSection(key)} className='text-nowrap text-lg font-semibold'>{key.split("-")[1]}</li>
                    ))}
                </ul>
                <button className='bg-[#20AC58] max-w-[200px] text-white p-2 rounded-md'>Take Quiz</button>
            </div>

        </div>
    )
}
