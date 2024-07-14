import React from 'react'

export default function AboutPage() {
    const heading = "About MediMinutes";
    const body1 = "MediMinutes is an educational tool and micro-credentialing system for medical professionals to stay on top of the field. As medical skills and practices evolve and diversify, medical professionals must follow suit.";
    const heading2 = "Time is Scarce, Information is Abundant"
    const body2 = "MediMinutes provides a convenient, online platform on which Medical professionals can interact with new research in an acessible manner. Our team uses AI tools to break complex medical papers and articles into chunks. These smaller learning blocks are connected into larger lessons which cover individual conditions or practices. Medical professionals work long hours with few breaks, MediMinutes makes keeping on top of new research easy by enabling users to learn new information in the time it takes to have their morning coffee."
    const heading3 = "Sources You can Trust"
    const body3 = "Our dedicated team carefully put together lessons based off of over 20,000 lines of data from the World Health Organization. We specifically chose the WHO for its status as a recognized source of trustworthy and academically backed medical information."

  return (
   // <div className="flex flex-row justify-start mt-10 p-[15px]">
   <div className="flex flex-row bg-[#e1e1ea] overflow-hidden justify-end mt-10 pt-[100px]">
    <div className="text-pretty flex-1 flex flex-col gap-y-2 max-w-[650px] pe-[50px]">
        <h1 className="text-3xl font-hanuman pb-[25px]" >{heading}</h1>
        <p className="text-balance tracking-wide text-lg font-hanken pb-[25px]">{body1}</p>
        <h2 className="text-xl font-hanuman pb-[15px]" >{heading2}</h2>
        <p className="text balance tracking-wide text-lg font-hanken pb-[25px]">{body2}</p>
        <h3 className="text-xl font-hanuman pb-[15px]" >{heading3}</h3>
        <p className="text balance tracking-wide text-lg font-hanken pb-[25px]">{body3}</p>
    </div>
   </div>
  )
}