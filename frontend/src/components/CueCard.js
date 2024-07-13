import React from 'react'

export default function CueCard({ header, body }) {
    return (
        <div className='flex flex-col gap-y-0 relative w-full'>
            <h2 className='text-2xl font-bold'>{header === "" ? "Health" : header }</h2>

            <div className='relative pt-[100px] h-fit mx-auto'>
                <div className='border border-black rounded-3xl p-4 max-w-[1090px] h-full max-h-[530px] bg-[#DDD5E5] absolute top-[-20px] ml-10 transform -rotate-[9deg] w-full z-[5]'></div>
                <div className='text-xl border border-black  rounded-lg  min-h-[500px] max-h-[500px] overflow-y-auto p-4 pt-8 pb-16 bg-white max-w-[1100px] z-[10] relative'>
                    {header.includes('Key Facts') ?
                        <ul className='list-disc pl-5'>
                            {body.map((row, index) => (
                                <li key={index}>{row}</li>
                            ))}
                        </ul>
                    : 
                    <div>
                    {body.map((row, index) => (
                        <p key={index} className='pl-5'>{row}</p>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}
