import React from 'react'

export default function CueCard({ header, body }) {
    console.log(body)
    return (
        <div className='flex flex-col gap-y-2 relative w-full'>
            <h2 className='text-2xl font-bold'>{header}</h2>

            <div className='relative pt-[200px] h-fit scale-[1.25] mx-auto'>
                <div className='border border-black rounded-3xl p-4 max-w-[800px] h-full max-h-[380px] bg-[#20AC58] absolute top-[295px] ml-7 transform -translate-y-1/2 -rotate-[9deg] w-full z-[5]'></div>
                <div className='border border-black rounded-lg h-full p-4 py-16 bg-white max-w-[800px] content-center z-[10] relative'>
                    {header.includes('Key Facts') ?
                        <ul className='list-disc pl-5'>
                            {body.map((row, index) => (
                                <li key={index}>{row}</li>
                            ))}
                        </ul>
                    : 
                    <div>
                    {body.map((row, index) => (
                        <p key={index} className='bulle'>{row}</p>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}
