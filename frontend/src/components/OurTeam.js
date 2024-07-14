import React from "react";

export default function OurTeam() {
  const aboutTeam = "Get to know the passionate individuals driving our mission to demystify health terminology and empower understanding. Together, we're dedicated to making complex medical knowledge accessible and meaningful for everyone.";
  return (
    <div className="relative h-full w-full flex flex-col calcPageHeight max-h-[100vh] max-w-[100vw] overflow-hidden">
    <img src="images/teamPageBackground.png" alt="Background Image" className="absolute inset-0 h-full w-full object-cover max-w-[100vw] overflow-hidden"/> 
    <div className="flex flex-col w-[50%] self-end pt-10 pr-10">
      <h1 className="text-8xl font-bold text-black z-10 HanumanFont border-l-2 border-b-4 border-black pl-[20px] text-nowrap min-w-fit mt-[50px]">Meet Our Team</h1>
      <p className="text-2xl font-lighter text-black z-10 mt-[20px]">{aboutTeam}</p>
    </div>  

      <div className="flex flex-row flex-wrap justify-center items-center h-full w-full relative gap-x-[140px] mb-[100px]">
        <div className="flex flex-col items-center">
          <div className="w-[180px] h-[180px] bg-white rounded-3xl border-[12px] border-[#242638] "></div>
          <img src="images/tyler_grey.png" alt="Image" className="w-[160px] h-[170px] aspect-square absolute pt-[10px] rounded-3xl"/>
          <div className="relative">
            <div className="absolute inset-0 bg-[#BCF3EE] transform -skew-y-12 clip-path-polygon -my-1 -mx-8 rounded-3xl "></div>
            <p className="relative z-10 font-lighter text-4xl font-helvetica bg-[#2F635F] text-white p-5 -mx-6 rounded-2xl">Full-Stack Developer</p>
          </div>
          <p className="font-bold text-5xl font-helvetica mt-[35px]">Tyler Beach</p>
          
        </div>


        <div className="flex flex-col items-center">
          <div className="w-[180px] h-[180px] bg-white rounded-3xl border-[12px] border-[#242638] "></div>
          <img src="images/aiden_grey.png" alt="Image" className="w-[160px] h-[170px] aspect-square absolute pt-[10px] rounded-3xl"/>
          <div className="relative">
            <div className="absolute inset-0 bg-[#F1D09F] transform -skew-y-12 clip-path-polygon -my-1 -mx-8 rounded-3xl "></div>
            <p className="relative z-10 font-lighter text-4xl font-helvetica bg-[#5C3722] text-white p-5 -mx-6 rounded-2xl">Backend Developer</p>
          </div>
          <p className="font-bold text-5xl font-helvetica mt-[35px]">Aiden Mitchell</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[180px] h-[180px] bg-white rounded-3xl border-[12px] border-[#242638] "></div>
          <img src="images/lucy_grey.png" alt="Image" className="w-[160px] h-[170px] aspect-square absolute pt-[10px] rounded-3xl"/>
          <div className="relative">
            <div className="absolute inset-0 bg-[#D3A8DE] transform -skew-y-12 clip-path-polygon -my-1 -mx-8 rounded-3xl "></div>
            <p className="relative z-10 font-lighter text-4xl font-helvetica bg-[#590D48] text-white p-5 -mx-6 rounded-2xl wrap">Web Designer <br /> & Developer</p>
          </div>
          <p className="font-bold text-5xl font-helvetica mt-[30px]">Lucy Bastell</p>
        </div>


        <div className="flex flex-col items-center">
          <div className="w-[180px] h-[180px] bg-white rounded-3xl border-[12px] border-[#242638] "></div>
          <img src="images/rimsha_grey.png" alt="Image" className="w-[160px] h-[170px] aspect-square absolute pt-[10px] rounded-3xl"/>
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFB7C8] transform -skew-y-12 clip-path-polygon -my-1 -mx-8 rounded-3xl "></div>
            <p className="relative z-10 font-lighter text-4xl font-helvetica bg-[#8C122F] text-white p-5 -mx-6 rounded-2xl">Frontend Developer</p>
          </div>
          <p className="font-bold text-5xl font-helvetica mt-[35px]">Rimsha Memon</p>
        </div>
      </div>
    </div>
  );
}


    