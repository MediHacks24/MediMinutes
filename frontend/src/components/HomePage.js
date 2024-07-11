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
    <div className="flex flex-row overflow-hidden  justify-center">
      <div className="flex-1 flex flex-col gap-y-2 max-w-[700px]">
        <div className="max-w-[700px] ml-auto">
          <h1 className="text-6xl font-bold ">{heading}</h1>
          <h2 className="font-lighter">{subheading}</h2>
          <div className="flex flex-col ">
            <button className="bg-[#20AC58] hover:bg-[#20AC58] text-white font-bold">
              Demo
            </button>
            <button className=" text-black font-bold py-2">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-y-2 h-fit max-w-[400px]" style={containerStyle}>
        <div className="mr-auto w-full h-full bg-red-500 " />
      </div>
    </div>
  );
}
