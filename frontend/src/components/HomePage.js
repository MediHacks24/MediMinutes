import React from "react";

export default function HomePage() {
  const heading = "Expand Your Health Vocabulary and Test Your Knowledge:";
  const subheading =
    "Empower yourself with essential health knowledge through interactive learning modules and quizzes. Understand diseases and health terminology to enhance your well-being.";

  const containerStyle = {
    position: "relative",
    width: "120px",
    height: "120px",
    marginLeft: "50px",
  };

  const squareStyle = {
    width: "450px",
    height: "450px",
    position: "absolute",
    borderRadius: "20px",
  };

  return (
    <div className="flex flex-row overflow-hidden justify-center mt-10 h-[100vh] pt-[40px]">
      <div className="flex-1 flex flex-col gap-y-2 max-w-[700px]">
        <div className="max-w-[600px] ml-[50px]">
          <h1 className="text-6xl font-bold pb-[25px]" >{heading}</h1>
          <h2 className="font-lighter pb-[25px]">{subheading}</h2>
          <div className="flex gap-x-10">
            <button className="w-[140px] bg-[rgb(32,172,88)] hover:bg-[#20AC58] text-white font-bold rounded-xl text-lg">
              Demo
            </button>
            <button className="w-[140px] text-black font-bold py-2 rounded-xl border border-black text-lg">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-y-2 h-fit max-w-[450px] relative ml-[60px]">
        <div className="mr-[20px] w-[450px] h-[450px] absolute rounded-3xl bg-[#65327D]"/>
        <div className="mr-[20px] w-[450px] h-[450px] absolute rounded-3xl bg-white border border-black mt-[10px] ml-[10px]"/>
          <img src="images/healthImage.jpg" alt="Image" className="mr-[20px] h-[450px] absolute rounded-3xl mt-[10px] ml-[10px]"/>
          <img src="images/yellowCircle.png" alt="Image" className="mr-[20px] h-[70px] w-[70px] absolute rounded-3xl mt-auto ml-auto"/> 
      </div>
    </div>
  );
}

