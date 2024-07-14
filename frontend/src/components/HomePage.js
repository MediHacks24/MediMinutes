import React from "react";
import Link from "next/link";

export default function HomePage() {
  const heading = "Expand Your Health Vocabulary and Test Your Knowledge:";
  const subheading =
    "Empower yourself with essential health knowledge through interactive learning modules and quizzes. Understand diseases and health terminology to enhance your well-being.";

  return (
    <div className="flex flex-row overflow-hidden justify-center gap-x-64 h-full px-20 pt-32">
      <div className="flex-[3] flex flex-col gap-y-2 h-full">
        <div className="flex flex-col  mx-auto gap-y-6">
          <h1 className="text-lg md:text-2xl lg:text-5xl xl:text-8xl font-bold leading-[105px]">{heading}</h1>
          <h2 className="font-light w-[80%] text-2xl">{subheading}</h2>
          <div className="flex gap-x-10 mt-4">
            
            <Link href="/categories" className="w-[25%] bg-[rgb(32,172,88)] hover:bg-[#20AC58] text-white font-bold rounded-xl text-2xl hover:scale-110 duration-200 text-center py-2">Demo</Link>
            <Link href="/signup" className="w-[25%] text-black font-bold py-2 rounded-xl border border-black text-2xl hover:scale-110 duration-200 text-center">Sign Up</Link>
            
            </div>
        </div>
      </div>
      <div className="flex-[2] flex flex-col gap-y-2 h-full relative w-full">
        <div className="absolute inset-[-20px] bg-[#D1C5DD]  w-[90%] aspect-square  rounded-3xl z-10"></div>
        <img src="images/healthImage.jpg" alt="Image" className="w-[90%] aspect-square absolute inset-0 rounded-3xl z-20"/>
        <img src="images/yellowCircle.png" alt="Image" className="w-[18%] absolute inset-[-55px] rounded-3xl z-20"/> 


      </div>
    </div>
  );
}
